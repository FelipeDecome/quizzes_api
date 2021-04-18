import AppError from '@shared/errors/AppError';
import { UserBuilder } from '@tests/builders/UserBuilder';
import { User } from '../infra/typeorm/entities/User';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { ShowUserProfileService } from './ShowUserProfileService';

let usersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;
describe('ShowUserProfile', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    showUserProfileService = new ShowUserProfileService(usersRepository);
  });

  it("Should be able to return the user's profile info", async () => {
    const user = await usersRepository.create(UserBuilder.aUser().build());

    const response = await showUserProfileService.execute({
      id: user.id,
    });

    expect(response).toBeInstanceOf(User);
  });

  it('Should fail if user not found', async () => {
    await expect(
      showUserProfileService.execute({
        id: 'unexistent_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
