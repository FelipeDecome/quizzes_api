import { v4 as uuid } from 'uuid';
import { IUserToken } from '@modules/users/entities/IUserToken';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_tokens')
class UserToken implements IUserToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  token: string;

  @Column()
  type: string;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
    if (!this.token) this.token = uuid();
  }
}

export { UserToken };
