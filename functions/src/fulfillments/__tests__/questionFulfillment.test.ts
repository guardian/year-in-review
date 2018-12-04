import {
  ConversationData,
  ResponseType,
  Unknown,
} from '../../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from '../../models/questions';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../../content/genericQuestionContent';
import {
  getQuestionBasedOnConversationData,
  getQuestionSpecificHelpAudio,
  questionFulfillment,
  questionHelpFulfillment,
  questionRepromptFulfillment,
} from '../questionFulfillment';

import { Topic } from '../../models/rounds';
import { buildSSMLAndCombineAudioResponses } from '../../responses/ssmlResponses';
import { unexpectedErrorResponse } from '../../utils/logger';

describe('Question Fulfillment', () => {
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
    questionFulfillment('', data);
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
    questionFulfillment('', data);
    expect(data).toEqual(expectedData);
  });
});

describe('questionRepromptFulfillment', () => {
  test('If reprompt cannot be fulfilled - no topic return Error Response', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const response = questionRepromptFulfillment(data, '');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    // tslint:disable-next-line:no-unused-expression
    expect(unexpectedErrorResponse).toBeCalled;
  });

  test('If there is a valid question number and topic return ASK response', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    const response = questionRepromptFulfillment(data, '');
    expect(response.responseType).toEqual(ResponseType.ASK);
    // tslint:disable-next-line:no-unused-expression
    expect(buildSSMLAndCombineAudioResponses).toBeCalled;
  });
});

describe('getQuestionBasedOnConversationData', () => {
  test('If the topic is not on the ConversationData object return Unknown object', () => {
    const data = {
      startRepromptIssued: false,
    };
    const response = getQuestionBasedOnConversationData(data);
    expect(response).toBeInstanceOf(Unknown);
  });
});

describe('questionHelpFulfillment', () => {
  test('If there is a question return question help audio', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const response = questionHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.ASK);
    // tslint:disable-next-line:no-unused-expression
    expect(getQuestionSpecificHelpAudio).toBeCalled;
  });

  test('If there is no question available return unexpected Error response and close the conversation', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const response = questionHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    // tslint:disable-next-line:no-unused-expression
    expect(unexpectedErrorResponse).toBeCalled;
  });
});

describe('getQuestionSpecificHelpAudio', () => {
  test('True false question gets true false audio', () => {
    const question = new TrueFalseQuestion('', '', '', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(trueFalseHelp);
  });

  test('multiple choice question gets multiple choice audio', () => {
    const question = new MultipleChoiceQuestion('', '', '', '', '', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(multipleChoiceHelp);
  });

  test('fill in the blank question gets fill in the blank audio', () => {
    const question = new FillInTheBlankQuestion('', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(fillInTheBlankHelp);
  });
});
