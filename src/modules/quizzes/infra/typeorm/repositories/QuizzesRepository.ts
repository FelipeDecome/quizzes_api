import { getRepository, Repository } from 'typeorm';

import IQuizzesRepository from '@modules/quizzes/repositories/IQuizzesRepository';
import Quiz from '../entities/Quiz';

export default class QuizzesRepository implements IQuizzesRepository {
  private ormRepository: Repository<Quiz>;

  constructor() {
    this.ormRepository = getRepository(Quiz);
  }

  public async save(data: Quiz): Promise<Quiz> {
    return this.ormRepository.save(data);
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
