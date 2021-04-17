import { v4 as uuid } from 'uuid';
import { IUser } from '@modules/users/entities/IUser';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TUserResponse } from '@modules/users/adapters/TUserResponse';

@Entity('users')
class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('boolean')
  email_verified: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }

  public userToClient(): TUserResponse {
    const { password, ...rest } = this;

    return {
      ...rest,
    };
  }
}

export { User };
