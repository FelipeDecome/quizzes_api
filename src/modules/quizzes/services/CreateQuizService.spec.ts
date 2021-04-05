import AppError from '@shared/errors/AppError';
import FakeQuizzesRepository from '../repositories/fakes/FakeQuizzesRepository';
import CreateQuizService from './CreateQuizService';

let quizzesRepository: FakeQuizzesRepository;
let createQuiz: CreateQuizService;

const correctQuestion = {
  text: 'question_text',
  answers: [
    {
      text: 'answer_text',
      is_correct: true,
    },
    {
      text: 'answer_text',
    },
    {
      text: 'answer_text',
    },
  ],
};

describe('CreateQuiz', () => {
  beforeEach(() => {
    quizzesRepository = new FakeQuizzesRepository();
    createQuiz = new CreateQuizService(quizzesRepository);
  });

  it('should be able to create a quiz', async () => {
    const quiz = await createQuiz.execute({
      title: 'quiz_title_with_16_characters',
      creator_email: 'creator_email',
      questions: [
        correctQuestion,
        correctQuestion,
        correctQuestion,
        correctQuestion,
      ],
    });

    expect(quiz).toHaveProperty('id');
  });

  it('should fail if title is shorter than 16 characters', async () => {
    await expect(
      createQuiz.execute({
        title: 'less_than_16',
        creator_email: 'creator_email',
        questions: [
          correctQuestion,
          correctQuestion,
          correctQuestion,
          correctQuestion,
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if less than 4 questions is provided', async () => {
    await expect(
      createQuiz.execute({
        title: 'quiz_title_with_16_characters',
        creator_email: 'creator_email',
        questions: [correctQuestion, correctQuestion, correctQuestion],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should fail if questions format is invalid', async () => {
    /* Only 2 answers */
    await expect(
      createQuiz.execute({
        title: 'quiz_title_with_16_characters',
        creator_email: 'creator_email',
        questions: [
          {
            text: 'question_text',
            answers: [
              {
                text: 'answer_text',
                is_correct: true,
              },
              {
                text: 'answer_text',
              },
            ],
          },
          correctQuestion,
          correctQuestion,
          correctQuestion,
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    /* More than 4 answers */
    await expect(
      createQuiz.execute({
        title: 'quiz_title_with_16_characters',
        creator_email: 'creator_email',
        questions: [
          {
            text: 'question_text',
            answers: [
              {
                text: 'answer_text',
                is_correct: true,
              },
              {
                text: 'answer_text',
              },
              {
                text: 'answer_text',
              },
              {
                text: 'answer_text',
              },
              {
                text: 'answer_text',
              },
            ],
          },
          correctQuestion,
          correctQuestion,
          correctQuestion,
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    /* No correct answer */
    await expect(
      createQuiz.execute({
        title: 'quiz_title_with_16_characters',
        creator_email: 'creator_email',
        questions: [
          {
            text: 'question_text',
            answers: [
              {
                text: 'answer_text',
              },
              {
                text: 'answer_text',
              },
              {
                text: 'answer_text',
              },
            ],
          },
          correctQuestion,
          correctQuestion,
          correctQuestion,
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);

    /* More than 1 correct answer */
    await expect(
      createQuiz.execute({
        title: 'quiz_title_with_16_characters',
        creator_email: 'creator_email',
        questions: [
          {
            text: 'question_text',
            answers: [
              {
                text: 'answer_text',
                is_correct: true,
              },
              {
                text: 'answer_text',
                is_correct: true,
              },
              {
                text: 'answer_text',
              },
            ],
          },
          correctQuestion,
          correctQuestion,
          correctQuestion,
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
