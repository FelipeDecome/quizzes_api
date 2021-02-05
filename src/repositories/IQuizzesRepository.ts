import ICreateQuizDTO from '../dtos/ICreateQuizDTO';
import Quiz from '../infra/typeorm/entities/Quiz';

export default interface IQuizzesRepository {
  create(data: ICreateQuizDTO): Promise<Quiz>;
  findById(id: string): Promise<Quiz | undefined>;
  findAllByEmail(email: string): Promise<Quiz[]>;
}
