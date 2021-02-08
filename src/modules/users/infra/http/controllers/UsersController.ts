import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRepository = new UsersRepository();
const bcryptHashProvider = new BcryptHashProvider();

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(
      usersRepository,
      bcryptHashProvider,
    );

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
