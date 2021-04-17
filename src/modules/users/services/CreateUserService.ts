import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import { IService } from '@shared/models/IService';
import { IMailProvider } from '@shared/containers/providers/MailProvider/models/IMailProvider';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../containers/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService implements IService<IRequest, IUser> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) throw new AppError('Email already in use');

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await this.usersTokensRepository.create({
      user_id: user.id,
      type: 'email_confirmation',
    });

    const link = `${process.env.APP_WEB_URL}/email-confirmation/${token.token}`;

    await this.mailProvider.sendMail({
      to: { email, name },
      subject: 'Confirmação de email Quizzes!',
      templateData: {
        file: path.resolve(
          __dirname,
          '..',
          'views',
          'handlebars',
          'email_confirmation.hbs',
        ),
        variables: {
          name,
          link,
        },
      },
    });

    return user;
  }
}

export { CreateUserService };
