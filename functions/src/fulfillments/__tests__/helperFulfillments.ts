import { ConversationData } from '../../models/models';
import { Topic } from '../../models/rounds';
import { helpFulfillment } from '../helperFulfillments';
import { questionHelpFulfillment } from '../questionFulfillment';
import { roundHelpFulfillment } from '../roundFulfillment';

describe('Content specific help', () => {
  test('If there is no topic offer category help', () => {
    const data: ConversationData = { startRepromptIssued: true };
    helpFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundHelpFulfillment).toBeCalled;
  });

  test('If there is a topic offer question help', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.TECH,
    };
    helpFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionHelpFulfillment).toBeCalled;
  });
});
