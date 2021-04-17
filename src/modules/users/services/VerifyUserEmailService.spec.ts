import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import { UserBuilder } from '@tests/builders/UserBuilder';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '../repositories/fakes/FakeUsersTokensRepository';
import { VerifyUserEmailService } from './VerifyUserEmailService';

let usersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUsersTokensRepository;
let verifyUserEmailService: VerifyUserEmailService;

describe('ConfirmUserEmail', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUsersTokensRepository();
    verifyUserEmailService = new VerifyUserEmailService(
      usersRepository,
      usersTokensRepository,
    );
  });

  it("Should be able to verify user's email", async () => {
    const user = await usersRepository.create(UserBuilder.aUser().build());
    const { token } = await usersTokensRepository.create({
      type: 'email_confirmation',
      user_id: user.id,
    });

    await verifyUserEmailService.execute({
      token,
    });

    const findToken = await usersTokensRepository.findByToken(token);

    expect(user.email_verified).toBeTruthy();
    expect(findToken).toBeUndefined();
  });

  it('Should fail if user not found', async () => {
    const { token } = await usersTokensRepository.create({
      type: 'email_confirmation',
      user_id: 'unexistent_user',
    });

    await expect(
      verifyUserEmailService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if token is not a valid UUID', async () => {
    await expect(
      verifyUserEmailService.execute({
        token: 'invalid_uuid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should fail if token is not a 'email_confirmation' type", async () => {
    const user = await usersRepository.create(UserBuilder.aUser().build());
    const { token } = await usersTokensRepository.create({
      type: 'reset_password',
      user_id: user.id,
    });

    await expect(
      verifyUserEmailService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if token does not exists', async () => {
    await expect(
      verifyUserEmailService.execute({
        token: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should fail if email is already verified', async () => {
    const user = await usersRepository.create(UserBuilder.aUser().build());
    user.email_verified = true;
    await usersRepository.save(user);

    const { token } = await usersTokensRepository.create({
      type: 'email_confirmation',
      user_id: user.id,
    });

    await expect(
      verifyUserEmailService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
