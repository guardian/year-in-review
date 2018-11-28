import { Category, UserData } from '../models/models';
import {
  askAgainResponse,
  doNotPlayResponse,
  helpAtStartResponse,
  welcomeResponse,
} from '../responses/welcomeResponse';

import { sportsOpeningResponse } from '../responses/sportsRoundResponse';

const welcomeFulfillment = () => {
  return welcomeResponse;
};

const askAgainFulfillment = (data: UserData) => {
  setReprompt(data);
  return askAgainResponse;
};

const setReprompt = (data: UserData) => {
  return (data.startRepromptIssued = true);
};

const startYearInReviewFulfillment = (data: UserData) => {
  data.currentQuestion = 1;
  data.currentCategory = Category.SPORT;
  return sportsOpeningResponse;
};

const doNotPlayFulfillment = () => {
  return doNotPlayResponse;
};

const helpAtStartFulfillment = () => {
  return helpAtStartResponse;
};

export {
  welcomeFulfillment,
  askAgainFulfillment,
  startYearInReviewFulfillment,
  doNotPlayFulfillment,
  helpAtStartFulfillment,
};
