import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '@modules/users/entities/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = new User();

    Object.assign(user, {
      ...data,
    });

    this.usersRepository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.usersRepository.find(user => user.email === email);
  }
}

export { FakeUsersRepository };
