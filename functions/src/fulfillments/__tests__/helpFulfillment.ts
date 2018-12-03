import { ConversationData } from '../../models/models';
import { Topic } from '../../models/rounds';
import { helpFulfillment } from '../helpFulfillment';
import { questionHelpFulfillment } from '../questionFulfillment';
import { roundHelpFulfillment } from '../roundFulfillment';

describe('Content specific help', () => {
  test('If there is no topic offer category help', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
    };
    helpFulfillment(data);
    expect(roundHelpFulfillment).toBeCalled;
  });

  test('If there is a topic offer question help', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.TECH,
    };
    helpFulfillment(data);
    expect(questionHelpFulfillment).toBeCalled;
  });
});
