import { Question, QuestionType } from '../questions';
import { Round, RoundCollection, Rounds } from '../rounds';

import { Topic } from '../categories';
import { Unknown } from '../models';

describe('Quiz Round', () => {
  test('return an Unknown object if question number is out of range', () => {
    const round = new Round([]);
    expect(round.getQuestion(1)).toBeInstanceOf(Unknown);
  });

  test('return an Question object if question number is in range', () => {
    const question = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const round = new Round([question]);
    expect(round.getQuestion(1)).toBeInstanceOf(Question);
  });
});

describe('Round Collection', () => {
  test('return Unknown object if Round not defined for the topic', () => {
    const rounds = new Rounds({});
    expect(rounds.getRound(Topic.NEWS)).toBeInstanceOf(Unknown);
  });

  test('return Unknown object if Round not defined for the topic', () => {
    const roundCollection: RoundCollection = { news: new Round([]) };
    const rounds: Rounds = new Rounds(roundCollection);
    expect(rounds.getRound(Topic.NEWS)).toBeInstanceOf(Round);
  });
});
