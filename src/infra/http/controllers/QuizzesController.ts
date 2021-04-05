import { Request, Response } from 'express';

import QuizzesRepository from '../../typeorm/repositories/QuizzesRepository';
import CreateQuizService from '../../../services/CreateQuizService';
import FindQuizService from '../../../services/FindQuizService';

export default class QuizzesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, questions, email } = request.body;

    const quizzesRepository = new QuizzesRepository();
    const createQuizService = new CreateQuizService(quizzesRepository);

    const quiz = await createQuizService.execute({
      title,
      questions,
      creator_email: email,
    });

    return response.status(201).json(quiz);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const quizzesRepository = new QuizzesRepository();
    const findQuizService = new FindQuizService(quizzesRepository);

    const quiz = findQuizService.execute({
      id,
    });

    return response.json(quiz);
  }
}
