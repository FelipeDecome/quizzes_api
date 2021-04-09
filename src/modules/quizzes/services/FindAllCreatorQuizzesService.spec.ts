import FakeQuizzesRepository from '../repositories/fakes/FakeQuizzesRepository';
import FindAllCreatorQuizzesService from './FindAllCreatorQuizzesService';

let quizzesRepository: FakeQuizzesRepository;
let findAllCreatorQuizzes: FindAllCreatorQuizzesService;

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

const quizzes = [
  {
    title: 'quiz_title_with_16_characters_1',
    creator_email: 'creator_email',
    questions: [
      correctQuestion,
      correctQuestion,
      correctQuestion,
      correctQuestion,
    ],
  },
  {
    title: 'quiz_title_with_16_characters_2',
    creator_email: 'creator_email',
    questions: [
      correctQuestion,
      correctQuestion,
      correctQuestion,
      correctQuestion,
    ],
  },
];

describe('CreateQuiz', () => {
  beforeEach(() => {
    quizzesRepository = new FakeQuizzesRepository();
    findAllCreatorQuizzes = new FindAllCreatorQuizzesService(quizzesRepository);
  });

  it('should be able to find all quizzes providing an email', async () => {
    const createdQuizzes = await Promise.all(
      quizzes.map(async quiz => quizzesRepository.save(quiz)),
    );

    const result = await findAllCreatorQuizzes.execute({
      email: 'creator_email',
    });

    expect(result).toEqual(createdQuizzes);
    expect(result).toHaveLength(2);
  });
});
