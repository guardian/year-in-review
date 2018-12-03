import { ConversationData, ResponseType, Unknown } from '../../models/models';
import {
  getQuestionBasedOnConversationData,
  questionRepromptFulfillment,
} from '../questionFulfillment';

import { Topic } from '../../models/rounds';
import { buildFeedbackQuestionSSMLAudioResponse } from '../../responses/genericResponse';
import { unexpectedErrorResponse } from '../../utils/logger';

describe('questionRepromptFulfillment', () => {
  test('If reprompt cannot be fulfilled - no topic return Error Response', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
    };
    const response = questionRepromptFulfillment(data, '');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
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
