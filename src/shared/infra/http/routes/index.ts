import { Router } from 'express';
import quizzesRouter from '@modules/quizzes/infra/http/routes/quizzes.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/quiz', quizzesRouter);
routes.use('/users', usersRouter);

export default routes;
