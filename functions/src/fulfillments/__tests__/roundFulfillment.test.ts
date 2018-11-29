import { ConversationData } from '../../models/models';
import { selectRound } from '../roundFulfillment';

describe('Select Round', () => {
  test('If no round set round to 1', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentRound: 1,
    };
    selectRound(data);
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
    selectRound(data);
    expect(data).toEqual(expectedData);
  });
});
