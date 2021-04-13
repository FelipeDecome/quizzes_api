import { container } from 'tsyringe';
import './providers';

import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
