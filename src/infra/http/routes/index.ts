import { Router } from 'express';
import quizzesRouter from './quizzes.routes';

const routes = Router();

routes.use('/quiz', quizzesRouter);

export default routes;
