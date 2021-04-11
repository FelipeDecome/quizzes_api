import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@shared/models/IController';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';

class SessionsController implements IController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: user.userToClient(), token });
  }
}

export { SessionsController };
