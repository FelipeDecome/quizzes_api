import { Router } from 'express';
import QuizzesRepository from '../repositories/typeorm/QuizzesRepository';
import CreateQuizService from '../services/CreateQuizService';

const routes = Router();

const quizzesRepository = new QuizzesRepository();

routes.post('/quiz', async (request, response) => {
  const { title, questions } = request.body;

  const createQuizService = new CreateQuizService(quizzesRepository);

  const quiz = await createQuizService.execute({ title, questions });

  return response.status(201).json(quiz);
});

export default routes;
