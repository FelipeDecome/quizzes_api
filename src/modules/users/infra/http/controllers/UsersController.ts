import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { getUsersRepositoryInstance } from '@modules/users/utils/getUsersRepositoryInstance';
import { IController } from '@shared/models/IController';
import { Request, Response } from 'express';

class UsersController implements IController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = await getUsersRepositoryInstance();
    const hashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
    );

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export { UsersController };
