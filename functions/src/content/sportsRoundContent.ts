import {
  OptionQuestion,
  Question,
  QuestionType,
  QuizRound,
} from '../models/questions';

import { Unknown } from '../models/models';

class SportsRound implements QuizRound {
  private questions: Question[];

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  public getQuestion(questionNumber: number): OptionQuestion {
    if (questionNumber > this.questions.length) {
      return new Unknown('out of bounds');
    } else {
      // Indexing starting from 0
      return this.questions[questionNumber - 1];
    }
  }
}

const sportsQuestions: Question[] = [
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/sportsOpener.mp3',
    'true',
    'https://s3.amazonaws.com/audiolab-audio/sportsQ1Correct.mp3',
    'https://s3.amazonaws.com/audiolab-audio/sportsQ1Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/sportsQ2.mp3',
    'true',
    '',
    '',
    QuestionType.MULTIPLECHOICE
  ),
];

const sportsOpenerAudio =
  'https://s3.amazonaws.com/audiolab-audio/sportsOpener.mp3';

const sportsRound = () => new SportsRound(sportsQuestions);

export { sportsOpenerAudio, sportsRound, SportsRound };
