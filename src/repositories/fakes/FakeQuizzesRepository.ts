import { v4 as uuid } from 'uuid';

import ICreateQuizDTO from '../../dtos/ICreateQuizDTO';
import Quiz from '../../infra/typeorm/entities/Quiz';
import IQuizzesRepository from '../IQuizzesRepository';

export default class FakeQuizzesRepository implements IQuizzesRepository {
  private quizzes: Quiz[] = [];

  public async create({ title, questions }: ICreateQuizDTO): Promise<Quiz> {
    const quiz = new Quiz();

    Object.assign(quiz, {
      id: uuid(),
      title,
      questions,
    });

    this.quizzes.push(quiz);

    return quiz;
  }

  public async findById(id: string): Promise<Quiz | undefined> {
    const findQuiz = this.quizzes.find(quiz => quiz.id === id);

    return findQuiz;
  }
}
