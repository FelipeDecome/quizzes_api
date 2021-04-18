import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/authenticate';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post('/', usersController.create);
usersRouter.get('/me', ensureAuthenticated, usersController.show);

export { usersRouter };
