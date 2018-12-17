import {
  ConversationData,
  Response,
  ResponseType,
  DoNotPlayFeedback,
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
} from '../content/welcomeContent';

import {
  buildSSMLAudioResponse,
  buildSSMLAndCombineAudioResponses,
} from '../responses/ssmlResponses';
import { chooseRound } from './roundFulfillment';
import { Container } from 'fluent-ssml';

const welcomeFulfillment = () => {
  return new Response(
    ResponseType.ASK,
    buildSSMLAudioResponse(welcomeAudio),
    welcomeText
  );
};

const repeatWelcomeFulfillment = (data: ConversationData): Response => {
  const audioResponse = buildSSMLAndCombineAudioResponses(
    repeatWelcomeAudio,
    welcomeAudio
  );
  return respondBasedOnRepromptCount(data, audioResponse, welcomeText);
};

const unrecognisedInputWelcomeFulfillment = (
  data: ConversationData
): Response => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(unrecognisedInputWelcomeAudio),
    unrecognisedInputWelcomeText
  );
};

const noInputWelcomeFulfillment = (data: ConversationData): Response => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(noInputWelcomeAudio),
    noInputWelcomeText
  );
};

const helpWelcomeFulfillment = (data: ConversationData): Response => {
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
): Response => {
  const count = data.repromptCount || 0;
  if (count < 3) {
    data.repromptCount = count + 1;
    return new Response(ResponseType.ASK, ssml, text);
  } else {
    const feedback = doNotPlayFulfillment();
    return new Response(ResponseType.CLOSE, feedback.audio, feedback.text);
  }
};

const doNotPlayFulfillment = (): DoNotPlayFeedback => {
  return new DoNotPlayFeedback(
    buildSSMLAudioResponse(doNotPlayAudio),
    doNotPlayText
  );
};

const startYearInReviewFulfillment = (data: ConversationData): Response => {
  return chooseRound(data);
};

export {
  welcomeFulfillment,
  startYearInReviewFulfillment,
  doNotPlayFulfillment,
  helpWelcomeFulfillment,
  unrecognisedInputWelcomeFulfillment,
  repeatWelcomeFulfillment,
  noInputWelcomeFulfillment,
  respondBasedOnRepromptCount,
};
