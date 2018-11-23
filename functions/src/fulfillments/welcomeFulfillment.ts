import {
  askAgainResponse,
  leaveYearInReviewResponse,
  startYearInReviewResponse,
  welcomeResponse,
} from '../responses/welcomeResponse';

const welcomeFulfillment = () => {
  return welcomeResponse;
};

const askAgainFulfillment = () => {
  return askAgainResponse;
};

const startYearInReviewFulfillment = () => {
  return startYearInReviewResponse;
};

const leaveYearInReviewFulfillment = () => {
  return leaveYearInReviewResponse;
};

export {
  welcomeFulfillment,
  askAgainFulfillment,
  startYearInReviewFulfillment,
  leaveYearInReviewFulfillment,
};
