import { OptionQuestion, Question } from './questions';

import { Topic } from './categories';
import { Unknown } from './models';

class QuizRound {
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

class RoundCollection {
  private rounds: Rounds;

  constructor(rounds: Rounds) {
    this.rounds = rounds;
  }

  public getRound(topic: Topic): OptionRound {
    const round = this.rounds[topic];
    if (typeof round === 'undefined') {
      return new Unknown('round not defined for this topic');
    } else {
      return round;
    }
  }
}

interface Rounds {
  [key: string]: QuizRound;
}

type OptionRound = QuizRound | Unknown;

export { QuizRound, RoundCollection, Rounds, OptionRound };
