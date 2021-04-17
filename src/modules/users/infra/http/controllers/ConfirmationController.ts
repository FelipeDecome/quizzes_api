import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@shared/models/IController';
import { VerifyUserEmailService } from '@modules/users/services/VerifyUserEmailService';

class ConfirmationController implements IController {
  public async patch(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const verifyUserEmailService = container.resolve(VerifyUserEmailService);
    await verifyUserEmailService.execute({ token });

    return response.status(204).send();
  }
}

export { ConfirmationController };
