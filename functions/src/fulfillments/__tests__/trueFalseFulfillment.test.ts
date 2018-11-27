import { Question, QuestionType, Unknown } from '../../models/models';
import { buildResponse, isCorrectAnswer } from '../trueFalseFulfillment';

import { buildQuestionSSMLAudioResponse } from '../../responses/sportsRoundResponse';

describe('Check if answer to question is correct', () => {
  test('a true-false question should be correct if the answers match', () => {
    const question = new Question('', 'true', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('true', question);
    expect(answer).toEqual(true);
  });

  test('a true-false question should be incorrect if the answers match', () => {
    const question = new Question('', 'false', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('true', question);
    expect(answer).toEqual(false);
  });
});

describe('Build a response', () => {
  test('If there is no current question but a next question return an error', () => {
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const response = buildResponse(currentQuestion, nextQuestion, 'true');
    expect(response).toEqual('Something went horribly wrong');
  });

  test('If there is no current question and no next question return an error', () => {
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const response = buildResponse(currentQuestion, nextQuestion, 'true');
    expect(response).toEqual('Something went horribly wrong');
  });

  test('If there is a current question and no next question end round', () => {
    const currentQuestion = new Question(
      '',
      '',
      '',
      '',
      QuestionType.TRUEFALSE
    );
    const nextQuestion = new Unknown('error');
    const response = buildResponse(currentQuestion, nextQuestion, 'true');
    expect(response).toEqual('End of Round. Next round not implemented yet');
  });

  test('If there is a current question and no next question end round', () => {
    const currentQuestion = new Question(
      '',
      '',
      '',
      '',
      QuestionType.TRUEFALSE
    );
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    buildResponse(currentQuestion, nextQuestion, 'true');
    expect(buildQuestionSSMLAudioResponse).toHaveBeenCalled;
  });
});
