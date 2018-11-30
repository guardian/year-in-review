import { ConversationData, ResponseType, Unknown } from '../../models/models';
import { Question, QuestionType } from '../../models/questions';
import {
  buildResponse,
  incrementQuestionNumber,
  isCorrectAnswer,
} from '../trueFalseFulfillment';

import { convertSSMLContainerToString } from '../../responses/genericResponse';
import { unexpectedErrorAudio } from '../../content/errorContent';

describe('Check question number can be incremented', () => {
  test('If question number is undefined next question number should be 1 as you must currently be asking question 1', () => {
    const data: ConversationData = { startRepromptIssued: false };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
    };
    incrementQuestionNumber(data);
    expect(data).toEqual(expectedData);
  });

  test('If question number is 1 new question number should be 2', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 2,
    };
    incrementQuestionNumber(data);
    expect(data).toEqual(expectedData);
  });
});

describe('Check if answer to question is correct', () => {
  test('a true-false question should be correct if the answers match and the answer is true', () => {
    const question = new Question('', 'true', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('true', question);
    expect(answer).toEqual(true);
  });

  test('a true-false question should be correct if the answers match and the answer is false', () => {
    const question = new Question('', 'false', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('false', question);
    expect(answer).toEqual(true);
  });

  test('a true-false question should be incorrect if the answers do not match and the answer is false', () => {
    const question = new Question('', 'false', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('true', question);
    expect(answer).toEqual(false);
  });

  test('a true-false question should be incorrect if the answers do not match and the answer is true', () => {
    const question = new Question('', 'true', '', '', QuestionType.TRUEFALSE);
    const answer = isCorrectAnswer('false', question);
    expect(answer).toEqual(false);
  });
});

describe('Build a response', () => {
  test('If there is no current question but a next question return an error', () => {
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const response = buildResponse(currentQuestion, nextQuestion, 'true');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    expect(convertSSMLContainerToString(response.responseSSML)).toContain(
      unexpectedErrorAudio
    );
  });

  test('If there is no current question and no next question return an error', () => {
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Unknown('error');
    const response = buildResponse(currentQuestion, nextQuestion, 'true');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    expect(convertSSMLContainerToString(response.responseSSML)).toContain(
      'End of Category. Next category not implemented yet'
    );
  });
});
