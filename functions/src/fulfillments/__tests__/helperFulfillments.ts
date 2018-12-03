import {
  fallbackFulfillment,
  helpFulfillment,
  noInputFulfillment,
  repeatFulfillment,
} from '../helperFulfillments';
import {
  questionHelpFulfillment,
  questionRepromptFulfillment,
} from '../questionFulfillment';
import {
  roundFallbackFulfillment,
  roundHelpFulfillment,
  roundNoInputFulfillment,
  roundRepeatFullfillment,
} from '../roundFulfillment';

import { ConversationData } from '../../models/models';
import { Topic } from '../../models/rounds';

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

describe('Content specific no input', () => {
  test('If there is no topic offer category no input', () => {
    const data: ConversationData = { startRepromptIssued: true };
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundNoInputFulfillment).toBeCalled;
  });

  test('If there is a topic offer question no input', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.TECH,
    };
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});

describe('Content specific unknown input', () => {
  test('If there is no topic offer category unknown input', () => {
    const data: ConversationData = { startRepromptIssued: true };
    fallbackFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundFallbackFulfillment).toBeCalled;
  });

  test('If there is a topic offer question unknown input', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.TECH,
    };
    fallbackFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});

describe('Content specific repeat', () => {
  test('If there is no topic offer category repeat', () => {
    const data: ConversationData = { startRepromptIssued: true };
    repeatFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundRepeatFullfillment).toBeCalled;
  });

  test('If there is a topic offer question repeat', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.TECH,
    };
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});
