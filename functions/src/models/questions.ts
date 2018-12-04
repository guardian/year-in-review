import { Unknown } from './conversation';

class Question {
  constructor(public questionAudio: string) {}
}

class TrueFalseQuestion extends Question {
  constructor(
    questionAudio: string,
    public answer: boolean,
    public correctAnswerAudio: string,
    public incorrectAnswerAudio: string
  ) {
    super(questionAudio);
  }
}

class MultipleChoiceQuestion extends Question {
  constructor(
    questionAudio: string,
    public answer: string,
    public AAudio: string,
    public BAudio: string,
    public CAudio: string,
    public DAudio: string
  ) {
    super(questionAudio);
  }
}

class FillInTheBlankQuestion extends Question {
  constructor(
    questionAudio: string,
    public answer: string,
    public correctAnswerAudio: string,
    public incorrectAnswerAudio: string
  ) {
    super(questionAudio);
  }
}

type OptionQuestion = Question | Unknown;

enum MultipleChoice {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

type OptionMultipleChoice = MultipleChoice | Unknown;

export {
  Question,
  OptionQuestion,
  MultipleChoice,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
  FillInTheBlankQuestion,
  OptionMultipleChoice,
};
