import { Response, ResponseType, UserData } from '../models/models';
import {
  askAgainAudio,
  doNotPlayAudio,
  helpAtStartAudio,
  welcomeAudio,
} from '../content/welcomeContent';

import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { selectCategory } from './categoryFulfillment';

const welcomeFulfillment = () => {
  return buildSSMLAudioResponse(welcomeAudio);
};

const askAgainFulfillment = (data: UserData) => {
  setReprompt(data);
  return buildSSMLAudioResponse(askAgainAudio);
};

const setReprompt = (data: UserData) => {
  return (data.startRepromptIssued = true);
};

const startYearInReviewFulfillment = (data: UserData): Response => {
  return selectCategory(data);
};

const doNotPlayFulfillment = () => {
  return buildSSMLAudioResponse(doNotPlayAudio);
};

const helpAtStartFulfillment = () => {
  return buildSSMLAudioResponse(helpAtStartAudio);
};

const invalidResponseFulfillment = (data: UserData): Response => {
  if (data.startRepromptIssued === true) {
    return new Response(ResponseType.CLOSE, doNotPlayFulfillment());
  } else {
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
