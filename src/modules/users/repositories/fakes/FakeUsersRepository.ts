import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}