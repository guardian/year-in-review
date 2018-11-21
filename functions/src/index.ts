import * as functions from 'firebase-functions';

import { dialogflow } from 'actions-on-google';
import { welcomeFulfillment } from './fulfillments/welcomeFulfillment';

const app = dialogflow({ debug: true });

app.intent('Welcome Intent', conv => {
  conv.close(welcomeFulfillment());
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
