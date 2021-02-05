import { getRepository, Repository } from 'typeorm';

import ICreateQuizDTO from '../../../dtos/ICreateQuizDTO';
import Quiz from '../entities/Quiz';
import IQuizzesRepository from '../../../repositories/IQuizzesRepository';

export default class QuizzesRepository implements IQuizzesRepository {
  private ormRepository: Repository<Quiz>;

  constructor() {
    this.ormRepository = getRepository(Quiz);
  }

  public async create(data: ICreateQuizDTO): Promise<Quiz> {
    const quiz = this.ormRepository.create(data);

    return this.ormRepository.save(quiz);
  }

  public async findById(id: string): Promise<Quiz | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAllByEmail(email: string): Promise<Quiz[]> {
    return this.ormRepository.find({
      where: {
        creator_email: email,
      },
    });
  }
}
