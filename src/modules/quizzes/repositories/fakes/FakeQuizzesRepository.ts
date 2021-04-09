import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO';
import Quiz from '@modules/quizzes/infra/typeorm/entities/Quiz';
import IQuizzesRepository from '../IQuizzesRepository';

export default class FakeQuizzesRepository implements IQuizzesRepository {
  private quizzes: Quiz[] = [];

  public async save(data: ICreateQuizDTO): Promise<Quiz> {
    const quiz = new Quiz();

    Object.assign(quiz, {
      ...data,
    });

    this.quizzes.push(quiz);

    return quiz;
  }

  public async findById(id: string): Promise<Quiz | undefined> {
    const findQuiz = this.quizzes.find(quiz => quiz.id === id);

    return findQuiz;
  }

  public async findAllByEmail(email: string): Promise<Quiz[]> {
    const findQuiz = this.quizzes.filter(quiz => quiz.creator_email === email);

    return findQuiz;
  }
}
