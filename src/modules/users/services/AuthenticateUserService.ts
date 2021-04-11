import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import AppError from '@shared/errors/AppError';
import { IService } from '@shared/models/IService';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../containers/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService implements IService<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists)
      throw new AppError('Incorrect email and password combination', 401);

    const passwordMatches = await this.hashProvider.compare(
      password,
      userExists.password,
    );

    if (!passwordMatches)
      throw new AppError('Incorrect email and password combination', 401);

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn,
    });

    return {
      user: userExists,
      token,
    };
  }
}

export { AuthenticateUserService };
