import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { IUserToken } from '@modules/users/entities/IUserToken';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private tokensRepository: IUserToken[] = [];

  public async create(data: ICreateUserTokenDTO): Promise<IUserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      ...data,
    });

    this.tokensRepository.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    return this.tokensRepository.find(findToken => findToken.token === token);
  }
}

export { FakeUsersTokensRepository };
