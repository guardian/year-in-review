import { Unknown } from './conversation';

class Question {
  constructor(
    public questionAudio: string,
    public questionText: string,
    public suggestionChips: string[]
  ) {}
}

class TrueFalseQuestion extends Question {
  constructor(
    questionAudio: string,
    questionText: string,
    public answer: boolean,
    public correctAnswerAudio: string,
    public correctAnswerText: string,
    public incorrectAnswerAudio: string,
    public incorrectAnswerText: string
  ) {
    super(questionAudio, questionText, ['True', 'False', 'Repeat']);
  }
}

class MultipleChoiceQuestion extends Question {
  constructor(
    questionAudio: string,
    questionText: string,
    public answer: MultipleChoice,
    public AAudio: string,
    public AText: string,
    public BAudio: string,
    public BText: string,
    public CAudio: string,
    public CText: string,
    public DAudio: string,
    public DText: string
  ) {
    super(questionAudio, questionText, ['A', 'B', 'C', 'D', 'Repeat']);
  }
}

class FillInTheBlankQuestion extends Question {
  constructor(
    questionAudio: string,
    questionText: string,
    public answer: string,
    public correctAnswerAudio: string,
    public correctAnswerText: string,
    public incorrectAnswerAudio: string,
    public incorrectAnswerText: string
  ) {
    super(questionAudio, questionText, ['Pass', 'Repeat']);
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
