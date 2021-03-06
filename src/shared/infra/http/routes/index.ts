import { Router } from 'express';
import quizzesRouter from '@modules/quizzes/infra/http/routes/quizzes.routes';

const routes = Router();

routes.use('/quiz', quizzesRouter);

export default routes;
