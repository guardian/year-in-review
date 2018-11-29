import { OptionQuestion, Question } from './questions';

import { Topic } from './categories';
import { Unknown } from './models';

class Round {
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

class Rounds {
  private roundCollection: RoundCollection;

  constructor(roundCollection: RoundCollection) {
    this.roundCollection = roundCollection;
  }

  public getRound(topic: Topic): OptionRound {
    const round = this.roundCollection[topic];
    if (typeof round === 'undefined') {
      return new Unknown('round not defined for this topic');
    } else {
      return round;
    }
  }
}

interface RoundCollection {
  [key: string]: Round;
}

type OptionRound = Round | Unknown;

export { Round, Rounds, RoundCollection, OptionRound };
