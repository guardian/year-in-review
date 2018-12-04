import { Contexts, DialogflowConversation } from 'actions-on-google';
import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';

import { convertSSMLContainerToString } from './ssmlResponses';

const respondBasedOnResponseType = (
  f: (data: ConversationData) => Response,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
) => {
  const fulfillment = f(conv.data);
  const response = convertSSMLContainerToString(fulfillment.responseSSML);
  if (fulfillment.responseType === ResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

const respondToUserInput = (
  input: string,
  conv: DialogflowConversation<ConversationData, {}, Contexts>,
  f: (input: string, data: ConversationData) => Response
) => {
  const fulfillment = f(input, conv.data);
  const response = convertSSMLContainerToString(fulfillment.responseSSML);
  if (fulfillment.responseType === ResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

export { respondBasedOnResponseType, respondToUserInput };