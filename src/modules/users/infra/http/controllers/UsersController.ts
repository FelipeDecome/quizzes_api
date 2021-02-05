import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRepository = new UsersRepository();

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
