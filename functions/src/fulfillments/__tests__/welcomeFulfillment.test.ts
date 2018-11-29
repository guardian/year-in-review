import { ConversationData, ResponseType } from '../../models/models';

import { invalidResponseFulfillment } from '../welcomeFulfillment';

describe('Unknown Input Welcome Fulfillment', () => {
  test('reprompt flag should be set to true when an invalid response is received', () => {
    const data: ConversationData = { startRepromptIssued: false };
    invalidResponseFulfillment(data);
    const expectedData: ConversationData = { startRepromptIssued: true };
    expect(data).toEqual(expectedData);
  });

  test('if user has not been repromted before (flat is false) Response Type should be ask', () => {
    const data: ConversationData = { startRepromptIssued: false };
    const response = invalidResponseFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.ASK);
  });

  test('if user has been repromted before (flat is true) Response Type should be close', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const response = invalidResponseFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
  });
});
