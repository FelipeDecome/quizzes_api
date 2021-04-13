import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';
import { UserBuilder } from '@tests/builders/UserBuilder';
import FakeMailProvider from '@shared/containers/providers/MailProvider/fakes/FakeMailProvider';
import { User } from '../infra/typeorm/entities/User';
import { FakeHashProvider } from '../containers/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from './CreateUserService';
import { FakeUsersTokensRepository } from '../repositories/fakes/FakeUsersTokensRepository';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let usersTokensRepository: FakeUsersTokensRepository;
let mailProvider: FakeMailProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    usersTokensRepository = new FakeUsersTokensRepository();
    mailProvider = new FakeMailProvider();

    createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
      usersTokensRepository,
      mailProvider,
    );
  });

  it('Should be able to create a user', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generate');
    const createToken = jest.spyOn(usersTokensRepository, 'create');
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const userData = UserBuilder.aUser().build();
    const user = await createUserService.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeUndefined();
    expect(validate(user.id)).toBeTruthy();
    expect(user.name).toEqual(userData.name);
    expect(user.email).toEqual(userData.email);

    expect(generateHash).toBeCalledWith(userData.password);
    expect(createToken).toBeCalledWith({
      user_id: user.id,
      type: 'email_confirmation',
    });
    expect(sendMail).toBeCalled();
  });

  it('Should fail if email is already in use', async () => {
    const userData = UserBuilder.aUser().build();

    await usersRepository.create(userData);

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
