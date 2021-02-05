import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import quizzesRouter from '@modules/quizzes/infra/http/routes/quizzes.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/quizzes', quizzesRouter);

export default routes;
