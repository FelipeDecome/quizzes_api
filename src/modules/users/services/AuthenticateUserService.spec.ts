import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate an user', async () => {
    const compareHash = jest.spyOn(fakeHashProvider, 'compareHash');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { user, token } = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(token).toBeTruthy();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
    expect(compareHash).toHaveBeenCalledWith('123456', user.password);
  });

  it('should fail if user does not exist', async () => {
    await expect(
      authenticateUser.execute({
        email: 'inexistent_user_email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if password is incorrect', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
