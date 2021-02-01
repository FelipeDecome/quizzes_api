interface IAnswer {
  text: string;
  is_correct: boolean;
}

interface IQuestion {
  text: string;
  answers: IAnswer[];
}

export default interface ICreateQuizDTO {
  title: string;
  questions: IQuestion[];
}
