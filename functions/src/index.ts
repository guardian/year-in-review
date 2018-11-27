import * as functions from 'firebase-functions';

import {
  askAgainFulfillment,
  doNotPlayFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';

import { UserData } from './models/models';
import { dialogflow } from 'actions-on-google';

const app = dialogflow<UserData, {}>({ debug: true });

app.intent('Welcome Intent', conv => {
  conv.ask(welcomeFulfillment());
});

app.intent('Welcome Intent - ready', conv => {
  conv.close(startYearInReviewFulfillment());
});

app.intent('Welcome Intent - fallback', conv => {
  if (conv.data.startRepromptIssued === true) {
    conv.close(doNotPlayFulfillment());
  } else {
    conv.ask(askAgainFulfillment(conv.data));
  }
});

app.intent('Quit App', conv => {
  conv.close(doNotPlayFulfillment());
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
