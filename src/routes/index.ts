import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => {
  const { quiz } = request.body;

  return response.status(201).json(quiz);
});

export default routes;
