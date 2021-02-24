import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateUserService;
let user: User;

describe('Update Profile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    });
  });

  it('Should be able to update the profile', async () => {
    const updatedInfo = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
    });

    expect(updatedInfo.name).toEqual('Jane Doe');
    expect(updatedInfo.email).toEqual('janedoe@example.com');
  });

  it('should be able to update only one information without affecting the other', async () => {
    const updatedInfo = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example2.com',
    });

    expect(updatedInfo.name).toEqual('John Doe');
    expect(updatedInfo.email).toEqual('johndoe@example2.com');

    const updatedInfo2 = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnes Doe',
      email: 'johndoe@example2.com',
    });

    expect(updatedInfo2.name).toEqual('Johnes Doe');
    expect(updatedInfo2.email).toEqual('johndoe@example2.com');
  });

  it('should fail if user does not exists', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non existent user',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if email is already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Johnes Doe',
      email: 'johnesdoe@example.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johnesdoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const updatedInfo = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'new_password',
      old_password: 'password',
    });

    expect(updatedInfo.password).toEqual('new_password');
  });

  it('should fail if old password does not match or is null', async () => {
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'new_password',
        old_password: 'wrong_old_password',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'new_password',
        old_password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
