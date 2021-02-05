import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, name, password }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email already in use.');

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
