import * as functions from 'firebase-functions';

import {
  Contexts,
  DialogflowConversation,
  dialogflow,
} from 'actions-on-google';
import {
  askAgainFulfillment,
  doNotPlayFulfillment,
  helpAtStartFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';

import { UserData } from './models/models';
import { trueFalseFulfullment } from './fulfillments/trueFalseFulfillment';

const app = dialogflow<UserData, {}>({ debug: true });

app.intent('Welcome Intent', conv => {
  conv.ask(welcomeFulfillment());
});

app.intent('Welcome Intent - ready', conv => {
  conv.ask(startYearInReviewFulfillment(conv.data));
});

app.intent('Welcome Intent - fallback', conv => {
  invalidResponse(conv);
});

app.intent('Welcome Intent - no input', conv => {
  invalidResponse(conv);
});

const invalidResponse = (
  conv: DialogflowConversation<UserData, {}, Contexts>
) => {
  if (conv.data.startRepromptIssued === true) {
    conv.close(doNotPlayFulfillment());
  } else {
    conv.ask(askAgainFulfillment(conv.data));
  }
};

app.intent('Welcome Intent - help', conv => {
  conv.ask(helpAtStartFulfillment());
});

app.intent('Welcome Intent - help - fallback', conv => {
  conv.close(doNotPlayFulfillment());
});

app.intent('Welcome Intent - help - help', conv => {
  conv.close(doNotPlayFulfillment());
});

app.intent<{ answer: string }>('True False Question', (conv, { answer }) => {
  conv.ask(trueFalseFulfullment(answer, conv.data));
});

app.intent('Quit App', conv => {
  conv.close(doNotPlayFulfillment());
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
