import { ConversationData, ResponseType, Unknown } from '../../models/models';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../../content/genericQuestionContent';
import {
  getQuestionBasedOnConversationData,
  getQuestionSpecificHelpAudio,
  questionHelpFulfillment,
  questionRepromptFulfillment,
} from '../questionFulfillment';

import { QuestionType } from '../../models/questions';
import { Topic } from '../../models/rounds';
import { buildFeedbackQuestionSSMLAudioResponse } from '../../responses/genericResponse';
import { unexpectedErrorResponse } from '../../utils/logger';

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
    expect(buildFeedbackQuestionSSMLAudioResponse).toBeCalled;
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
      currentTopic: Topic.POLITICS,
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
    const response = getQuestionSpecificHelpAudio(QuestionType.TRUEFALSE);
    expect(response).toEqual(trueFalseHelp);
  });

  test('multiple choice question gets multiple choice audio', () => {
    const response = getQuestionSpecificHelpAudio(QuestionType.MULTIPLECHOICE);
    expect(response).toEqual(multipleChoiceHelp);
  });

  test('fill in the blank question gets fill in the blank audio', () => {
    const response = getQuestionSpecificHelpAudio(QuestionType.FILLINTHEBLANK);
    expect(response).toEqual(fillInTheBlankHelp);
  });
});
