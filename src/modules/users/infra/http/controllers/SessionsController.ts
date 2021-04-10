import { Request, Response } from 'express';
import { IController } from '@shared/models/IController';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { getUsersRepositoryInstance } from '@modules/users/utils/getUsersRepositoryInstance';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

class SessionsController implements IController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = await getUsersRepositoryInstance();
    const hashProvider = new BCryptHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { SessionsController };
