import { Request, Response } from 'express';

import QuizzesRepository from '../../typeorm/repositories/QuizzesRepository';
import CreateQuizService from '../../../services/CreateQuizService';

export default class QuizzesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, questions } = request.body;

    const quizzesRepository = new QuizzesRepository();

    const createQuizService = new CreateQuizService(quizzesRepository);

    const quiz = await createQuizService.execute({ title, questions });

    return response.status(201).json(quiz);
  }
}
