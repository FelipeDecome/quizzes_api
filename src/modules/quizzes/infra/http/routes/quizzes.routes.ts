import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import QuizzesController from '../controllers/QuizzesController';

const quizzesController = new QuizzesController();

const quizzesRouter = Router();

quizzesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(8).max(128).required(),
      questions: Joi.string().required(),
      creator_email: Joi.string().email().required(),
    }),
  }),
  quizzesController.create,
);
quizzesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  quizzesController.show,
);

export default quizzesRouter;
