import { Request, Response } from 'express';

import QuizzesRepository from '@modules/quizzes/infra/typeorm/repositories/QuizzesRepository';
import CreateQuizService from '@modules/quizzes/services/CreateQuizService';
import FindQuizService from '@modules/quizzes/services/FindQuizService';

const quizzesRepository = new QuizzesRepository();

export default class QuizzesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, questions, creator_email } = request.body;

    const createQuizService = new CreateQuizService(quizzesRepository);

    const quiz = await createQuizService.execute({
      title,
      questions,
      creator_email,
    });

    return response.status(201).json(quiz);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findQuizService = new FindQuizService(quizzesRepository);

    const quiz = findQuizService.execute({
      id,
    });

    return response.json(quiz);
  }
}
