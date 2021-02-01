import AppError from '../errors/AppError';

import Quiz from '../infra/typeorm/entities/Quiz';
import IQuizzesRepository from '../repositories/IQuizzesRepository';

interface IRequest {
  id: string;
}

export default class FindQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  public async execute({ id }: IRequest): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findById(id);

    if (!quiz) throw new AppError('Quiz not found.', 404);

    return quiz;
  }
}
