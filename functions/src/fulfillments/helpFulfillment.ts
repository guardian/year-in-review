import { ConversationData, Response, Unknown } from '../models/models';
import { getTopic, questionHelpFulfillment } from './questionFulfillment';

import { roundHelpFulfillment } from './roundFulfillment';

const helpFulfillment = (data: ConversationData): Response => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundHelpFulfillment(data);
  } else {
    return questionHelpFulfillment(data);
  }
};

export { helpFulfillment };
