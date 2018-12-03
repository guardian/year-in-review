import { ConversationData, Response, Unknown } from '../models/models';
import {
  getTopic,
  questionHelpFulfillment,
  questionRepromptFulfillment,
} from './questionFulfillment';
import {
  noInput,
  repeat,
  unknownInput,
} from '../content/genericQuestionContent';
import {
  roundFallbackFulfillment,
  roundHelpFulfillment,
  roundNoInputFulfillment,
  roundRepeatFullfillment,
} from './roundFulfillment';

const helpFulfillment = (data: ConversationData): Response => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundHelpFulfillment(data);
  } else {
    return questionHelpFulfillment(data);
  }
};

const noInputFulfillment = (data: ConversationData): Response => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundNoInputFulfillment(data);
  } else {
    return questionRepromptFulfillment(data, noInput);
  }
};

const fallbackFulfillment = (data: ConversationData): Response => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundFallbackFulfillment(data);
  } else {
    return questionRepromptFulfillment(data, unknownInput);
  }
};

const repeatFulfillment = (data: ConversationData): Response => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundRepeatFullfillment(data);
  } else {
    return questionRepromptFulfillment(data, repeat);
  }
};

export {
  helpFulfillment,
  noInputFulfillment,
  fallbackFulfillment,
  repeatFulfillment,
};
