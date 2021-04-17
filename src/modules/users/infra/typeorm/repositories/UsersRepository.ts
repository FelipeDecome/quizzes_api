import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUser } from '@modules/users/entities/IUser';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(data);

    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<IUser | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.ormRepository.findOne({
      email,
    });
  }

  public async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user);
  }
}

export { UsersRepository };
