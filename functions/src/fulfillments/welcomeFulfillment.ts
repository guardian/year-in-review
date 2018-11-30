import { ConversationData, Response, ResponseType } from '../models/models';
import {
  askAgainAudio,
  doNotPlayAudio,
  helpAtStartAudio,
  welcomeAudio,
} from '../content/welcomeContent';

import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { selectRound } from './roundFulfillment';

const welcomeFulfillment = () => {
  return buildSSMLAudioResponse(welcomeAudio);
};

const askAgainFulfillment = (data: ConversationData) => {
  return buildSSMLAudioResponse(askAgainAudio);
};

const setReprompt = (data: ConversationData) => {
  return (data.startRepromptIssued = true);
};

const startYearInReviewFulfillment = (data: ConversationData): Response => {
  return selectRound(data);
};

const doNotPlayFulfillment = () => {
  return buildSSMLAudioResponse(doNotPlayAudio);
};

const helpAtStartFulfillment = () => {
  return buildSSMLAudioResponse(helpAtStartAudio);
};

const invalidResponseFulfillment = (data: ConversationData): Response => {
  if (data.startRepromptIssued === true) {
    return new Response(ResponseType.CLOSE, doNotPlayFulfillment());
  } else {
    setReprompt(data);
    return new Response(ResponseType.ASK, askAgainFulfillment(data));
  }
};

export {
  welcomeFulfillment,
  startYearInReviewFulfillment,
  doNotPlayFulfillment,
  helpAtStartFulfillment,
  invalidResponseFulfillment,
};
