import AppError from '@shared/errors/AppError';
import { IService } from '@shared/models/IService';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
}

@injectable()
class VerifyUserEmailService implements IService<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const isValidUUID = validate(token);
    if (!isValidUUID) throw new AppError('Token is not a valid UUID');

    const findToken = await this.usersTokensRepository.findByToken(token);
    if (!findToken)
      throw new AppError('Email confirmation token does not exists');
    if (findToken.type !== 'email_confirmation')
      throw new AppError("Token must be an 'email_confirmation' type ");

    const findUser = await this.usersRepository.findById(findToken.user_id);
    if (!findUser) throw new AppError('User not found');
    if (findUser.email_verified)
      throw new AppError('Email is already verified');

    findUser.email_verified = true;
    await this.usersRepository.save(findUser);
    await this.usersTokensRepository.delete(findToken.id);
  }
}

export { VerifyUserEmailService };
