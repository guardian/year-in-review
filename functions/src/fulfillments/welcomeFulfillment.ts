import {
  askAgainResponse,
  doNotPlayResponse,
  startYearInReviewResponse,
  welcomeResponse,
} from '../responses/welcomeResponse';

import { UserData } from '../models/models';

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

const startYearInReviewFulfillment = () => {
  return startYearInReviewResponse;
};

const doNotPlayFulfillment = () => {
  return doNotPlayResponse;
};

export {
  welcomeFulfillment,
  askAgainFulfillment,
  startYearInReviewFulfillment,
  doNotPlayFulfillment,
};
