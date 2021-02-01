import AppError from '../errors/AppError';

import Quiz from '../entities/Quiz';
import IQuizzesRepository from '../repositories/IQuizzesRepository';

interface IAnswer {
  text: string;
  is_correct: boolean;
}

interface IQuestion {
  text: string;
  answers: IAnswer[];
}

interface IRequest {
  title: string;
  questions: IQuestion[];
}

export default class CreateQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  public async execute({ title, questions }: IRequest): Promise<Quiz> {
    questions.forEach(question => {
      const { answers } = question;

      if (answers.length < 3 && answers.length > 4)
        throw new AppError(
          'Questions must have at least 3 possible answers and at maximun 4.',
        );

      const correctAnswer = answers.filter(answer => answer.is_correct);

      if (correctAnswer.length <= 0)
        throw new AppError('Questions must have 1 correct answer.');

      if (correctAnswer.length > 1)
        throw new AppError('Questions must have only 1 correct answer.');
    });

    if (title.length < 16)
      throw new AppError('Title must have at least 16 characters.');

    const quiz = await this.quizzesRepository.create({
      title,
      questions,
    });

    return quiz;
  }
}
