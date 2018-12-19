import {
  Contexts,
  DialogflowConversation,
  SimpleResponse,
  Suggestions,
} from 'actions-on-google';
import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
} from '../models/conversation';

import { convertSSMLContainerToString } from './ssmlResponses';
import { Container } from 'fluent-ssml';

const respondBasedOnResponseType = (
  f: (data: ConversationData) => DialogflowResponse,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
): void => {
  const response = f(conv.data);
  respondToUser(response, conv);
};

const respondBasedOnUserInput = (
  input: string,
  conv: DialogflowConversation<ConversationData, {}, Contexts>,
  f: (input: string, data: ConversationData) => DialogflowResponse
): void => {
  const response = f(input, conv.data);
  respondToUser(response, conv);
};

const respondToUser = (
  response: DialogflowResponse,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
): void => {
  if (typeof response.responseText === 'string') {
    singleBubbleResponse(
      conv,
      response.responseSSML,
      response.responseText,
      response.suggestionChips,
      response.responseType
    );
  } else {
    twoBubbleResponse(
      conv,
      response.responseSSML,
      response.responseText,
      response.suggestionChips,
      response.responseType
    );
  }
};

const singleBubbleResponse = (
  conv: DialogflowConversation<ConversationData, {}, Contexts>,
  ssml: Container,
  textSupport: string,
  suggestionChips: string[],
  responseType: DialogflowResponseType
) => {
  const response = new SimpleResponse({
    speech: convertSSMLContainerToString(ssml),
    text: textSupport,
  });
  if (responseType === DialogflowResponseType.ASK) {
    conv.ask(response);
    if (suggestionChips.length > 0) {
      conv.ask(new Suggestions(suggestionChips));
    }
  } else {
    conv.close(response);
  }
};

const twoBubbleResponse = (
  conv: DialogflowConversation<ConversationData, {}, Contexts>,
  ssml: Container,
  text: [string, string],
  suggestionChips: string[],
  responseType: DialogflowResponseType
) => {
  // An empty ssml response is sent to stop the Google Assistant reading out the text in part 1
  const part1 = new SimpleResponse({
    speech: '<speak></speak>',
    text: text[0],
  });
  const part2 = new SimpleResponse({
    speech: convertSSMLContainerToString(ssml),
    text: text[1],
  });
  conv.ask(part1);
  if (responseType === DialogflowResponseType.ASK) {
    conv.ask(part2);
    if (suggestionChips.length > 0) {
      conv.ask(new Suggestions(suggestionChips));
    }
  } else {
    conv.close(part2);
  }
};

export { respondBasedOnResponseType, respondBasedOnUserInput };
