import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';
import { User } from '../infra/typeorm/entities/User';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
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

    const user = await createUserService.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeUndefined();
    expect(validate(user.id)).toBeTruthy();
    expect(user.name).toEqual('john doe');
    expect(user.email).toEqual('johndoe@example.com');
    expect(generateHash).toBeCalledWith('123456');
  });

  it('Should fail if email is already in use', async () => {
    const email = 'johndoe@example.com';

    await usersRepository.create({
      name: 'john doe',
      email,
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'john does',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
