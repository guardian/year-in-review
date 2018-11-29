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
    const roundCollection = new RoundCollection({});
    expect(roundCollection.getRound(Topic.NEWS)).toBeInstanceOf(Unknown);
  });

  test('return Unknown object if Round not defined for the topic', () => {
    const rounds: Rounds = { news: new Round([]) };
    const roundCollection = new RoundCollection(rounds);
    expect(roundCollection.getRound(Topic.NEWS)).toBeInstanceOf(Round);
  });
});
