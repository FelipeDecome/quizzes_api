import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';
import { UserBuilder } from '@tests/builders/UserBuilder';
import { User } from '../infra/typeorm/entities/User';
import { FakeHashProvider } from '../containers/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from './CreateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
  });

  it('Should be able to create a user', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generate');

    const userData = UserBuilder.aUser().build();
    const user = await createUserService.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeUndefined();
    expect(validate(user.id)).toBeTruthy();
    expect(user.name).toEqual(userData.name);
    expect(user.email).toEqual(userData.email);
    expect(generateHash).toBeCalledWith(userData.password);
  });

  it('Should fail if email is already in use', async () => {
    const userData = UserBuilder.aUser().build();

    await usersRepository.create(userData);

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
