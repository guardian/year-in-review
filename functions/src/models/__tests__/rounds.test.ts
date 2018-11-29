import { Question, QuestionType } from '../questions';

import { Round } from '../rounds';
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
