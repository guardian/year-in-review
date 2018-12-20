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

import {
  convertSSMLContainerToString,
  buildSSMLAudioResponse,
} from './ssmlResponses';
import { Container } from 'fluent-ssml';
import {
  unexpectedErrorAudio,
  unexpectedErrorText,
} from '../content/errorContent';

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
  if (
    typeof response.responseText === 'string' &&
    response.responseSSML instanceof Container
  ) {
    singleBubbleResponse(
      conv,
      response.responseSSML,
      response.responseText,
      response.suggestionChips,
      response.responseType
    );
  } else {
    if (
      response.responseText instanceof Array &&
      response.responseSSML instanceof Array
    ) {
      twoBubbleResponse(
        conv,
        response.responseSSML,
        response.responseText,
        response.suggestionChips,
        response.responseType
      );
    } else {
      // tslint:disable-next-line:no-console
      console.error(
        `Number of audio and text responses didn't match up for Dialogflow response ${response} and conversation data ${
          conv.data
        }`
      );
      singleBubbleResponse(
        conv,
        buildSSMLAudioResponse(unexpectedErrorAudio),
        unexpectedErrorText,
        [],
        DialogflowResponseType.CLOSE
      );
    }
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
  ssml: [Container, Container],
  text: [string, string],
  suggestionChips: string[],
  responseType: DialogflowResponseType
) => {
  const part1 = new SimpleResponse({
    speech: convertSSMLContainerToString(ssml[0]),
    text: text[0],
  });
  const part2 = new SimpleResponse({
    speech: convertSSMLContainerToString(ssml[1]),
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
