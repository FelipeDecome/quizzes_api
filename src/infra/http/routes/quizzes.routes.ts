import { Router } from 'express';
import QuizzesController from '../controllers/QuizzesController';

const quizzesController = new QuizzesController();

const quizzesRouter = Router();

quizzesRouter.post('/', quizzesController.create);
quizzesRouter.get('/:id', quizzesController.show);

export default quizzesRouter;
