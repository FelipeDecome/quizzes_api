import { IUser } from '../entities/IUser';

type TUserResponse = Omit<IUser, 'password'>;

export { TUserResponse };
