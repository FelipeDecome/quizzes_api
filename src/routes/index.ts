import { Router } from 'express';

const routes = Router();

interface IAnswer {
  text: string;
  is_correct: boolean;
}

interface IQuestion {
  text: string;
  answers: IAnswer[];
}

interface IQuiz {
  title: string;
  questions: IQuestion[];
}

routes.post('/', (request, response) => {
  const quiz = request.body.quiz as IQuiz;

  return response.status(201).json(quiz);
});

export default routes;
