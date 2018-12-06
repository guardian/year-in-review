import { ConversationData, ResponseType } from '../../models/conversation';

import { respondBasedOnRepromptCount} from '../welcomeFulfillment';
import { Container } from 'fluent-ssml';
import { buildSSMLAudioResponse } from '../../responses/ssmlResponses';

describe('Unknown Input Welcome Fulfillment', () => {
  test('reprompt flag should be set to true when an invalid response is received', () => {
    const data: ConversationData = { startRepromptIssued: false };
    const ssml: Container = buildSSMLAudioResponse('');
    respondBasedOnRepromptCount(data, ssml);
    const expectedData: ConversationData = { startRepromptIssued: true };
    expect(data).toEqual(expectedData);
  });
  
  test('if user has not been repromted before (flat is false) Response Type should be ask', () => {
    const data: ConversationData = { startRepromptIssued: false };
    const ssml: Container = buildSSMLAudioResponse('');
    const response = respondBasedOnRepromptCount(data, ssml);
    expect(response.responseType).toEqual(ResponseType.ASK);
  });
  
  test('if user has been repromted before (flat is true) Response Type should be close', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const ssml: Container = buildSSMLAudioResponse('');
    const response = respondBasedOnRepromptCount(data, ssml);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
  });
});
