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

  public async findById(id: string): Promise<IUser | undefined> {
    return this.usersRepository.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.usersRepository.find(user => user.email === email);
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );
    this.usersRepository[findIndex] = user;

    return user;
  }
}

export { FakeUsersRepository };
