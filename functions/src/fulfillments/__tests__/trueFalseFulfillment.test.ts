import { ConversationData, ResponseType, Unknown } from '../../models/models';
import { Question, QuestionType } from '../../models/questions';
import {
  askNextQuestion,
  buildResponse,
  endOfCategory,
  isCorrectAnswer,
  trueFalseFulfullment,
} from '../trueFalseFulfillment';

import { Topic } from '../../models/rounds';
import { unexpectedErrorResponse } from '../../utils/logger';

describe('trueFalseFulfillment', () => {
  test('If question number is undefined next question number should be 1 as you must currently be asking question 1', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    trueFalseFulfullment('', data);
    expect(data).toEqual(expectedData);
  });

  test('If question number is 1 new question number should be 2', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 2,
      currentTopic: Topic.NEWS,
    };
    trueFalseFulfullment('', data);
    expect(data).toEqual(expectedData);
  });

  test('If there is no topic return an error response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
    };
    const response = trueFalseFulfullment('', data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    expect(unexpectedErrorResponse).toBeCalled;
  });

  test('If there is a topic call buildResponse', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    trueFalseFulfullment('', data);
    expect(buildResponse).toBeCalled;
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
  test('If there is no current question but a next question return an error response', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const response = buildResponse(data, currentQuestion, nextQuestion, 'true');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    expect(unexpectedErrorResponse).toBeCalled;
  });

  test('If there is no current question and no next question return an error', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new Unknown('error');
    const nextQuestion = new Unknown('error');
    const response = buildResponse(data, currentQuestion, nextQuestion, 'true');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    expect(unexpectedErrorResponse).toBeCalled;
  });

  test('If there is a current question and a next question askNextQuestion', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new Question(
      '',
      '',
      '',
      '',
      QuestionType.TRUEFALSE
    );
    const nextQuestion = new Question('', '', '', '', QuestionType.TRUEFALSE);
    buildResponse(data, currentQuestion, nextQuestion, 'true');
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new Question(
      '',
      '',
      '',
      '',
      QuestionType.TRUEFALSE
    );
    const nextQuestion = new Unknown('error');
    buildResponse(data, currentQuestion, nextQuestion, 'true');
    expect(endOfCategory).toBeCalled;
  });
});
