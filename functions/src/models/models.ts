interface UserData {
  startRepromptIssued: boolean;
  currentCategory?: Category;
  currentQuestion?: number;
}

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

class Unknown {
  public error: string;
  constructor(error: string) {
    this.error = error;
  }
}

type OptionQuestion = Question | Unknown;

interface Categories {
  [index: string]: QuizRound;
}

enum Category {
  SPORT = 'sport',
}

enum QuestionType {
  TRUEFALSE,
  MULTIPLECHOICE,
  FILLINTHEBLANK,
}

interface QuizRound {
  getQuestion(questionNumber: number): OptionQuestion;
}

export {
  UserData,
  Question,
  Category,
  Categories,
  QuizRound,
  Unknown,
  OptionQuestion,
  QuestionType,
};
