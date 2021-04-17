import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { IUserToken } from '../entities/IUserToken';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
  delete(id: string): Promise<void>;
}

export { IUsersTokensRepository };
