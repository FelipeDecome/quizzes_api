import { verify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';

import AppError from '@shared/errors/AppError';
import { UserBuilder } from '@tests/builders/UserBuilder';
import { User } from '../infra/typeorm/entities/User';
import { AuthenticateUserService } from './AuthenticateUserService';
import { FakeHashProvider } from '../containers/providers/HashProvider/fakes/FakeHashProvider';
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
    const userData = UserBuilder.aUser().build();

    await usersRepository.create(userData);

    const response = await authenticateUserService.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(response.user).toBeInstanceOf(User);
    expect(response.token).toBeDefined();
    expect(verify(response.token, authConfig.jwt.secret)).toBeTruthy();
  });

  it('Should fail if user does not exists', async () => {
    const userData = UserBuilder.aUser().build();

    await expect(
      authenticateUserService.execute({
        email: userData.email,
        password: userData.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if password or email is incorrect', async () => {
    const userData = UserBuilder.aUser().build();
    const userDataWithWrongPassword = UserBuilder.aUser()
      .withWrongPassword()
      .build();

    await usersRepository.create(userData);

    await expect(
      authenticateUserService.execute({
        email: userDataWithWrongPassword.email,
        password: userDataWithWrongPassword.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
