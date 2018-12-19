import {
  ConversationData,
  DialogflowResponseType,
} from '../../models/conversation';

import { respondBasedOnRepromptCount } from '../welcomeFulfillment';
import { Container } from 'fluent-ssml';
import { buildSSMLAudioResponse } from '../../responses/ssmlResponses';

describe('Unknown Input Welcome Fulfillment', () => {
  test('reprompt count should be incremented when an invalid response is received', () => {
    const data: ConversationData = {};
    const ssml: Container = buildSSMLAudioResponse('');
    respondBasedOnRepromptCount(data, ssml, '');
    const expectedData: ConversationData = { repromptCount: 1 };
    expect(data).toEqual(expectedData);
  });

  test('reprompt count is less than 3 Response Type should be ask and reprompt count should be incremented', () => {
    const data: ConversationData = { repromptCount: 1 };
    const ssml: Container = buildSSMLAudioResponse('');
    const response = respondBasedOnRepromptCount(data, ssml, '');
    expect(response.responseType).toEqual(DialogflowResponseType.ASK);
    const expectedData = { repromptCount: 2 };
    expect(data).toEqual(expectedData);
  });

  test('if user has been repromted 3 or more times Response Type should be close', () => {
    const data: ConversationData = { repromptCount: 3 };
    const ssml: Container = buildSSMLAudioResponse('');
    const response = respondBasedOnRepromptCount(data, ssml, '');
    expect(response.responseType).toEqual(DialogflowResponseType.CLOSE);
  });
});
