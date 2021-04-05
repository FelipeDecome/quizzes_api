import Quiz from '../infra/typeorm/entities/Quiz';
import IQuizzesRepository from '../repositories/IQuizzesRepository';

interface IRequest {
  email: string;
}

export default class FindAllCreatorQuizzesService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  public async execute({ email }: IRequest): Promise<Quiz[]> {
    const quizzes = await this.quizzesRepository.findAllByEmail(email);

    return quizzes;
  }
}
