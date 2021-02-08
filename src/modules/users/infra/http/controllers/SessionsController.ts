import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRepository = new UsersRepository();
const bcryptHashProvider = new BcryptHashProvider();

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      bcryptHashProvider,
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
