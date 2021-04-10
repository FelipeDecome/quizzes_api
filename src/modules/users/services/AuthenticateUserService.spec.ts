import { verify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';

import AppError from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { AuthenticateUserService } from './AuthenticateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';

let hashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });

  it('Should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.user).toBeInstanceOf(User);
    expect(response.token).toBeDefined();
    expect(verify(response.token, authConfig.jwt.secret)).toBeTruthy();
  });

  it('Should fail if user does not exists', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'non-existent-user',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if password is incorrect', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
