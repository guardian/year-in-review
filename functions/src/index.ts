import * as functions from 'firebase-functions';

import {
  askAgainFulfillment,
  leaveYearInReviewFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';

import { dialogflow } from 'actions-on-google';

const app = dialogflow({ debug: true });

app.intent('Welcome Intent', conv => {
  conv.ask(welcomeFulfillment());
});

app.intent('Welcome Intent - no', conv => {
  conv.ask(askAgainFulfillment());
});

app.intent('Welcome Intent - no - yes', conv => {
  conv.ask(startYearInReviewFulfillment());
});

app.intent('Welcome Intent - no - no', conv => {
  conv.close(leaveYearInReviewFulfillment());
});

app.intent('Welcome Intent - yes', conv => {
  conv.close(startYearInReviewFulfillment());
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
