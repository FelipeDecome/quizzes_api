import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');

    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists && email !== user.email)
      throw new AppError('Email already in use.');

    Object.assign(user, {
      name,
      email,
    });

    if (password && !old_password) {
      throw new AppError('Old password must be informed.');
    }
    if (old_password) {
      const oldPasswordMatches = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordMatches)
        throw new AppError('Old password does not match.');
    }

    if (password)
      user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}
