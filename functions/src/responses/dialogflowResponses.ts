import {
  Contexts,
  DialogflowConversation,
  SimpleResponse,
} from 'actions-on-google';
import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
} from '../models/conversation';

import { convertSSMLContainerToString } from './ssmlResponses';

const respondBasedOnResponseType = (
  f: (data: ConversationData) => DialogflowResponse,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
) => {
  const fulfillment = f(conv.data);
  const response = new SimpleResponse({
    speech: convertSSMLContainerToString(fulfillment.responseSSML),
    text: fulfillment.responseText,
  });
  if (fulfillment.responseType === DialogflowResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

const respondToUserInput = (
  input: string,
  conv: DialogflowConversation<ConversationData, {}, Contexts>,
  f: (input: string, data: ConversationData) => DialogflowResponse
) => {
  const fulfillment = f(input, conv.data);
  const response = new SimpleResponse({
    speech: convertSSMLContainerToString(fulfillment.responseSSML),
    text: fulfillment.responseText,
  });
  if (fulfillment.responseType === DialogflowResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

export { respondBasedOnResponseType, respondToUserInput };
