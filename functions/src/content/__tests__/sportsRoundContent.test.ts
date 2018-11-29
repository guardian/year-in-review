import { Question, QuestionType } from '../../models/questions';
import { SportsRound, sportsRound } from '../sportsRoundContent';

describe('Sports Round', () => {
  let round: SportsRound;
  beforeAll(() => {
    round = sportsRound();
  });

  test('getQuestion returns the correct question', () => {
    const expectedQuestion: Question = new Question(
      'https://s3.amazonaws.com/audiolab-audio/sportsOpener.mp3',
      'true',
      'https://s3.amazonaws.com/audiolab-audio/sportsQ1Correct.mp3',
      'https://s3.amazonaws.com/audiolab-audio/sportsQ1Incorrect.mp3',
      QuestionType.TRUEFALSE
    );

    expect(round.getQuestion(1)).toEqual(expectedQuestion);
  });

  test('getQuestion returns "Unknown" object if the question number exceeds the number of questions', () => {
    const expectedResponse = { error: 'out of bounds' };

    expect(round.getQuestion(100)).toEqual(expectedResponse);
  });
});
