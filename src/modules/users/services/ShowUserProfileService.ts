import AppError from '@shared/errors/AppError';
import { IService } from '@shared/models/IService';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserProfileService implements IService<IRequest, IUser> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IUser> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) throw new AppError('User not found');

    return findUser;
  }
}

export { ShowUserProfileService };
