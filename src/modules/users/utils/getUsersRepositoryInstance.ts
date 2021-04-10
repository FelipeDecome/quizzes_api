import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

let usersRepositoryInstance: UsersRepository;

const getUsersRepositoryInstance = async (): Promise<UsersRepository> => {
  if (usersRepositoryInstance) return usersRepositoryInstance;

  usersRepositoryInstance = new UsersRepository();

  return usersRepositoryInstance;
};

export { getUsersRepositoryInstance };
