import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(4).max(36).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(24).required(),
    }),
  }),
  usersController.create,
);

export default usersRouter;
