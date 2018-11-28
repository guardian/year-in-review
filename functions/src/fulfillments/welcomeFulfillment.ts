import { Response, UserData } from '../models/models';
import {
  askAgainResponse,
  doNotPlayResponse,
  helpAtStartResponse,
  welcomeResponse,
} from '../responses/welcomeResponse';

import { Topic } from '../models/categories';
// import { sportsOpeningResponse } from '../responses/sportsRoundResponse';
import { getCategoryIntroduction } from './categoryFulfillment';

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

const startYearInReviewFulfillment = (data: UserData): Response => {
  return getCategoryIntroduction(data);
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
