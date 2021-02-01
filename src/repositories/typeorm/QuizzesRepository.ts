import { getRepository, Repository } from 'typeorm';
import ICreateQuizDTO from '../../dtos/ICreateQuizDTO';
import Quiz from '../../entities/Quiz';
import IQuizzesRepository from '../IQuizzesRepository';

export default class QuizzesRepository implements IQuizzesRepository {
  private ormRepository: Repository<Quiz>;

  constructor() {
    this.ormRepository = getRepository(Quiz);
  }

  public async create({ title, questions }: ICreateQuizDTO): Promise<Quiz> {
    const quiz = this.ormRepository.create({
      title,
      questions,
    });

    return this.ormRepository.save(quiz);
  }

  public async findById(id: string): Promise<Quiz | undefined> {
    return this.ormRepository.findOne(id);
  }
}
