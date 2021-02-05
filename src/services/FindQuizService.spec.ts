import AppError from '../errors/AppError';
import FakeQuizzesRepository from '../repositories/fakes/FakeQuizzesRepository';
import FindQuizService from './FindQuizService';

let quizzesRepository: FakeQuizzesRepository;
let findQuiz: FindQuizService;

const correctQuestion = {
  text: 'question_text',
  answers: [
    {
      text: 'answer_text',
      is_correct: true,
    },
    {
      text: 'answer_text',
      is_correct: false,
    },
    {
      text: 'answer_text',
      is_correct: false,
    },
  ],
};

const quiz = {
  title: 'quiz_title_with_16_characters',
  email: 'user_email',
  questions: [
    correctQuestion,
    correctQuestion,
    correctQuestion,
    correctQuestion,
  ],
};

describe('CreateQuiz', () => {
  beforeEach(() => {
    quizzesRepository = new FakeQuizzesRepository();
    findQuiz = new FindQuizService(quizzesRepository);
  });

  it('should be able to find a quiz', async () => {
    const { id } = await quizzesRepository.create(quiz);

    const result = await findQuiz.execute({ id });

    expect(result).toBeTruthy();
    expect(result.id).toEqual(id);
  });

  it('should fail if quiz does not exist', async () => {
    await expect(
      findQuiz.execute({ id: 'inexistent_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
