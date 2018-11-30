import { ConversationData, ResponseType } from '../../models/models';
import { chooseRound, roundHelpFulfillment } from '../roundFulfillment';

describe('Select Round', () => {
  test('If no round set round to 1', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentRound: 1,
    };
    chooseRound(data);
    expect(data).toEqual(expectedData);
  });

  test('Update round correctly if round exists on ConversationData', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentRound: 3,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentRound: 4,
    };
    chooseRound(data);
    expect(data).toEqual(expectedData);
  });
});

describe('Help with round selection', () => {
  test('round help audio is not an empty string', () => {
    const data = { startRepromptIssued: true };
    const response = roundHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.ASK);
    expect(response.responseSSML).not.toEqual('');
  });
});
