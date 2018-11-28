import { Unknown } from './models';

class Question {
  public questionAudio: string;
  public answer: string;
  public correctAnswerAudio: string;
  public incorrectAnswerAudio: string;
  public questionType: QuestionType;

  constructor(
    questionAudio: string,
    answer: string,
    correctAnswerAudio: string,
    incorrectAnswerAudio: string,
    questionType: QuestionType
  ) {
    this.questionAudio = questionAudio;
    this.answer = answer;
    this.correctAnswerAudio = correctAnswerAudio;
    this.incorrectAnswerAudio = incorrectAnswerAudio;
    this.questionType = questionType;
  }
}

type OptionQuestion = Question | Unknown;

enum QuestionType {
  TRUEFALSE,
  MULTIPLECHOICE,
  FILLINTHEBLANK,
}

interface QuizRound {
  getQuestion(questionNumber: number): OptionQuestion;
}

export { Question, QuizRound, OptionQuestion, QuestionType };
