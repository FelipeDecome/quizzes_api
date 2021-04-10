import AppError from '@shared/errors/AppError';
import { IService } from '@shared/models/IService';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService implements IService<IRequest, IUser> {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
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

    return user;
  }
}

export { CreateUserService };
