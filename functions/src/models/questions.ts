import { Unknown } from './conversation';

class Question {
  constructor(
    public questionAudio: string,
    public answer: string,
    public correctAnswerAudio: string,
    public incorrectAnswerAudio: string,
    public questionType: QuestionType
  ) {}
}

type OptionQuestion = Question | Unknown;

enum QuestionType {
  TRUEFALSE,
  MULTIPLECHOICE,
  FILLINTHEBLANK,
}

export { Question, OptionQuestion, QuestionType };
