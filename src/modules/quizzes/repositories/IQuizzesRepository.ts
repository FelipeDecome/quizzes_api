import Quiz from '../infra/typeorm/entities/Quiz';

export default interface IQuizzesRepository {
  save(data: Quiz): Promise<Quiz>;
  findById(id: string): Promise<Quiz | undefined>;
  findAllByEmail(email: string): Promise<Quiz[]>;
}
