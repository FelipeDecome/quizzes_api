import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../entities/IUser';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
}

export { IUsersRepository };
