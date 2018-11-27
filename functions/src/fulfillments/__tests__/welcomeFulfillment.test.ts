import { UserData } from '../../models/models';
import { askAgainFulfillment } from '../welcomeFulfillment';

describe('unknown start fulfillment', () => {
  test('reprompt flag should be set to true when this fulfillment is triggered', () => {
    const data: UserData = { startRepromptIssued: false };
    askAgainFulfillment(data);
    const expectedData: UserData = { startRepromptIssued: true };
    expect(data).toEqual(expectedData);
  });
});
