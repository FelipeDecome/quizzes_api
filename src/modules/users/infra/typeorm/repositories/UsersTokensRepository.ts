import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { IUserToken } from '@modules/users/entities/IUserToken';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(data: ICreateUserTokenDTO): Promise<IUserToken> {
    const userToken = this.ormRepository.create(data);

    return this.ormRepository.save(userToken);
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    return this.ormRepository.findOne({
      token,
    });
  }
}

export { UsersTokensRepository };
