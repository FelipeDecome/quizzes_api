import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';
import { IController } from '@shared/models/IController';
import { ShowUserProfileService } from '@modules/users/services/ShowUserProfileService';

class UsersController implements IController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user.userToClient());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserProfileService = container.resolve(ShowUserProfileService);
    const user = await showUserProfileService.execute({ id });

    return response.json({ user: user.userToClient() });
  }
}

export { UsersController };
