import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
  MultimediaResponse,
} from '../models/conversation';
import {
  unrecognisedInputWelcomeAudio,
  doNotPlayAudio,
  helpWelcomeAudio,
  welcomeAudio,
  repeatWelcomeAudio,
  noInputWelcomeAudio,
  welcomeText,
  unrecognisedInputWelcomeText,
  noInputWelcomeText,
  helpWelcomeText,
  doNotPlayText,
  welcomeSuggestionChips,
  userTypingWarning,
} from '../content/welcomeContent';

import {
  buildSSMLAudioResponse,
  buildSSMLAndCombineAudioResponses,
} from '../responses/ssmlResponses';
import { chooseRound } from './roundFulfillment';
import { Container } from 'fluent-ssml';

const welcomeFulfillment = () => {
  return buildWelcome(welcomeText);
};

const welcomeFulfillmentWithTypingWarning = () => {
  return buildWelcome([userTypingWarning, welcomeText]);
};

const buildWelcome = (text: string | [string, string]) => {
  return new DialogflowResponse(
    DialogflowResponseType.ASK,
    buildSSMLAudioResponse(welcomeAudio),
    text,
    welcomeSuggestionChips
  );
};

const repeatWelcomeFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  const audioResponse = buildSSMLAndCombineAudioResponses(
    repeatWelcomeAudio,
    welcomeAudio
  );
  return respondBasedOnRepromptCount(data, audioResponse, welcomeText);
};

const unrecognisedInputWelcomeFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(unrecognisedInputWelcomeAudio),
    unrecognisedInputWelcomeText
  );
};

const noInputWelcomeFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(noInputWelcomeAudio),
    noInputWelcomeText
  );
};

const helpWelcomeFulfillment = (data: ConversationData): DialogflowResponse => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(helpWelcomeAudio),
    helpWelcomeText
  );
};

const respondBasedOnRepromptCount = (
  data: ConversationData,
  ssml: Container,
  text: string
): DialogflowResponse => {
  const count = data.repromptCount || 0;
  if (count < 3) {
    data.repromptCount = count + 1;
    return new DialogflowResponse(
      DialogflowResponseType.ASK,
      ssml,
      text,
      welcomeSuggestionChips
    );
  } else {
    const feedback = doNotPlayFulfillment();
    return new DialogflowResponse(
      DialogflowResponseType.CLOSE,
      feedback.audio,
      feedback.text,
      []
    );
  }
};

const doNotPlayFulfillment = (): MultimediaResponse => {
  return new MultimediaResponse(
    buildSSMLAudioResponse(doNotPlayAudio),
    doNotPlayText
  );
};

const startYearInReviewFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  return chooseRound(data);
};

export {
  welcomeFulfillment,
  welcomeFulfillmentWithTypingWarning,
  startYearInReviewFulfillment,
  doNotPlayFulfillment,
  helpWelcomeFulfillment,
  unrecognisedInputWelcomeFulfillment,
  repeatWelcomeFulfillment,
  noInputWelcomeFulfillment,
  respondBasedOnRepromptCount,
};
