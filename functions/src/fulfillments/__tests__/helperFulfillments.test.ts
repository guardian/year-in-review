import {
  fallbackFulfillment,
  helpFulfillment,
  noInputFulfillment,
  repeatFulfillment,
} from '../helperFulfillments';
import {
  questionRepromptFulfillment,
} from '../questionFulfillment';
import {
  roundFallbackFulfillment,
  roundHelpFulfillment,
  roundNoInputFulfillment,
  roundRepeatFullfillment,
} from '../roundFulfillment';

import { ConversationData } from '../../models/conversation';
import { Topic } from '../../models/rounds';

describe('Content specific help', () => {
  test('If there is no topic offer category help', () => {
    const data: ConversationData = {};
    helpFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundHelpFulfillment).toBeCalled;
  });

  test('If there is a topic offer question help', () => {
    const data: ConversationData = {
      currentTopic: Topic.ARTS,
    };
    helpFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});

describe('Content specific no input', () => {
  test('If there is no topic offer category no input', () => {
    const data: ConversationData = {};
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundNoInputFulfillment).toBeCalled;
  });

  test('If there is a topic offer question no input', () => {
    const data: ConversationData = {
      currentTopic: Topic.ARTS,
    };
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});

describe('Content specific unknown input', () => {
  test('If there is no topic offer category unknown input', () => {
    const data: ConversationData = {};
    fallbackFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundFallbackFulfillment).toBeCalled;
  });

  test('If there is a topic offer question unknown input', () => {
    const data: ConversationData = {
      currentTopic: Topic.SCIENCE,
    };
    fallbackFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});

describe('Content specific repeat', () => {
  test('If there is no topic offer category repeat', () => {
    const data: ConversationData = {};
    repeatFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(roundRepeatFullfillment).toBeCalled;
  });

  test('If there is a topic offer question repeat', () => {
    const data: ConversationData = {
      currentTopic: Topic.SCIENCE,
    };
    noInputFulfillment(data);
    // tslint:disable-next-line:no-unused-expression
    expect(questionRepromptFulfillment).toBeCalled;
  });
});
