import { Router } from 'express';

import quizzesRouter from '@modules/quizzes/infra/http/routes/quizzes.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { confirmationRouter } from '@modules/users/infra/http/routes/confirmation.routes';

const routes = Router();

routes.use('/quiz', quizzesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/email-confirmation', confirmationRouter);

export default routes;
