import { ConversationData, ResponseType } from '../../models/conversation';
import { chooseRound, roundHelpFulfillment } from '../roundFulfillment';

describe('Select Round', () => {
  test('If no round set round to 1', () => {
    const data: ConversationData = {};
    const expectedData: ConversationData = {
      currentRound: 1,
    };
    chooseRound(data);
    expect(data).toEqual(expectedData);
  });

  test('Update round correctly if round exists on ConversationData', () => {
    const data: ConversationData = {
      currentRound: 10,
    };
    const expectedData: ConversationData = {
      currentRound: 11,
    };
    chooseRound(data);
    expect(data).toEqual(expectedData);
  });
});

describe('Help with round selection', () => {
  test('round help audio is not an empty string', () => {
    const data = {};
    const response = roundHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.ASK);
    expect(response.responseSSML).not.toEqual('');
  });
});
