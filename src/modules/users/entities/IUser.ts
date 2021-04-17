import { TUserResponse } from '../adapters/TUserResponse';

interface IUser {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;
  userToClient(): TUserResponse;
}

export { IUser };
