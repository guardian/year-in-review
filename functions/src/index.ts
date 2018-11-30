import * as functions from 'firebase-functions';

import { ConversationData, ResponseType } from './models/models';
import {
  doNotPlayFulfillment,
  helpAtStartFulfillment,
  invalidResponseFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';

import { dialogflow } from 'actions-on-google';
import { startCategory } from './fulfillments/categoryFulfillment';
import { trueFalseFulfullment } from './fulfillments/trueFalseFulfillment';

const app = dialogflow<ConversationData, {}>({ debug: true });

app.intent('Welcome Intent', conv => {
  conv.ask(welcomeFulfillment());
});

app.intent('Welcome Intent - ready', conv => {
  const response = startYearInReviewFulfillment(conv.data);
  if (response.responseType === ResponseType.ASK) {
    conv.ask(response.responseSSML);
  } else {
    conv.close(response.responseSSML);
  }
});

app.intent('Welcome Intent - fallback', conv => {
  const response = invalidResponseFulfillment(conv.data);
  if (response.responseType === ResponseType.ASK) {
    conv.ask(response.responseSSML);
  } else {
    conv.close(response.responseSSML);
  }
});

app.intent('Welcome Intent - no input', conv => {
  const response = invalidResponseFulfillment(conv.data);
  if (response.responseType === ResponseType.ASK) {
    conv.ask(response.responseSSML);
  } else {
    conv.close(response.responseSSML);
  }
});

app.intent('Welcome Intent - help', conv => {
  conv.ask(helpAtStartFulfillment());
});

app.intent('Welcome Intent - help - fallback', conv => {
  conv.close(doNotPlayFulfillment());
});

app.intent('Welcome Intent - help - help', conv => {
  conv.close(doNotPlayFulfillment());
});

app.intent<{ topicChoice: string }>(
  'News-Sport-Tech Round',
  (conv, { topicChoice }) => {
    const response = startCategory(topicChoice, conv.data);
    if (response.responseType === ResponseType.ASK) {
      conv.ask(response.responseSSML);
    } else {
      conv.close(response.responseSSML);
    }
  }
);

app.intent('Round Help', conv => {
  const response = roundHelpFulfillment(conv.data);
  if (response.responseType === ResponseType.ASK) {
    conv.ask(response.responseSSML);
  } else {
    conv.close(response.responseSSML);
  }
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
