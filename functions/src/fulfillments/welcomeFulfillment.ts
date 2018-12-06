import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';
import {
  unrecognisedInputWelcomeAudio,
  doNotPlayAudio,
  helpWelcomeAudio,
  welcomeAudio,
  repeatWelcomeAudio,
  noInputWelcomeAudio,
} from '../content/welcomeContent';

import {
  buildSSMLAudioResponse,
  buildSSMLAndCombineAudioResponses,
} from '../responses/ssmlResponses';
import { chooseRound } from './roundFulfillment';
import { Container } from 'fluent-ssml';

const welcomeFulfillment = () => {
  return buildSSMLAudioResponse(welcomeAudio);
};

const repeatWelcomeFulfillment = (data: ConversationData) => {
  const response = buildSSMLAndCombineAudioResponses(
    repeatWelcomeAudio,
    welcomeAudio
  );
  return respondBasedOnRepromptCount(data, response);
};

const unrecognisedInputWelcomeFulfillment = (data: ConversationData) => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(unrecognisedInputWelcomeAudio)
  );
};

const noInputWelcomeFulfillment = (data: ConversationData) => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(noInputWelcomeAudio)
  );
};

const helpWelcomeFulfillment = (data: ConversationData) => {
  return respondBasedOnRepromptCount(
    data,
    buildSSMLAudioResponse(helpWelcomeAudio)
  );
};

const respondBasedOnRepromptCount = (
  data: ConversationData,
  ssml: Container
) => {
  const count = data.repromptCount || 0;
  if (count < 2) {
    data.repromptCount = count + 1;
    return new Response(ResponseType.ASK, ssml);
  } else {
    return new Response(ResponseType.CLOSE, doNotPlayFulfillment());
  }
};

const doNotPlayFulfillment = () => {
  return buildSSMLAudioResponse(doNotPlayAudio);
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
