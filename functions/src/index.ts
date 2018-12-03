import * as functions from 'firebase-functions';

import {
  Contexts,
  DialogflowConversation,
  dialogflow,
} from 'actions-on-google';
import { ConversationData, Response, ResponseType } from './models/models';
import {
  doNotPlayFulfillment,
  helpAtStartFulfillment,
  invalidResponseFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';
import { noInput, unknownInput } from './content/genericQuestionContent';
import {
  roundFallbackFulfillment,
  roundHelpFulfillment,
  roundNoInputFulfillment,
  roundRepeatFullfillment,
} from './fulfillments/roundFulfillment';

import { convertSSMLContainerToString } from './responses/genericResponse';
import { questionRepromptFulfillment } from './fulfillments/questionFulfillment';
import { startCategory } from './fulfillments/categoryFulfillment';
import { trueFalseFulfullment } from './fulfillments/trueFalseFulfillment';

const app = dialogflow<ConversationData, {}>({
  debug: true,
});

app.intent('Welcome Intent', conv => {
  const response = convertSSMLContainerToString(welcomeFulfillment());
  conv.ask(response);
});

app.intent('Welcome Intent - ready', conv => {
  // Removing the welcome intent contexts
  conv.contexts.set('welcomeintent-followup', 0);
  conv.contexts.set('welcomeintent-help-followup', 0);
  respond(startYearInReviewFulfillment, conv);
});

app.intent('Welcome Intent - fallback', conv => {
  respond(invalidResponseFulfillment, conv);
});

app.intent('Welcome Intent - no input', conv => {
  respond(invalidResponseFulfillment, conv);
});

app.intent('Welcome Intent - help', conv => {
  const response = convertSSMLContainerToString(helpAtStartFulfillment());
  conv.ask(response);
});

app.intent('Welcome Intent - help - fallback', conv => {
  const response = convertSSMLContainerToString(doNotPlayFulfillment());
  conv.close(response);
});

app.intent('Welcome Intent - help - help', conv => {
  const response = convertSSMLContainerToString(doNotPlayFulfillment());
  conv.close(response);
});

app.intent<{ topicChoice: string }>(
  'News-Sport-Tech Round',
  (conv, { topicChoice }) => {
    const fulfillment = startCategory(topicChoice, conv.data);
    const response = convertSSMLContainerToString(fulfillment.responseSSML);
    if (fulfillment.responseType === ResponseType.ASK) {
      conv.ask(response);
    } else {
      conv.close(response);
    }
  }
);

app.intent('Round Help', conv => {
  respond(roundHelpFulfillment, conv);
});

app.intent('Round Repeat', conv => {
  respond(roundRepeatFullfillment, conv);
});

app.intent('Round No Input', conv => {
  respond(roundNoInputFulfillment, conv);
});

app.intent('Round Fallback', conv => {
  respond(roundFallbackFulfillment, conv);
});

app.intent<{ answer: string }>(
  'News-Sport-Tech Round - trueFalse',
  (conv, { answer }) => {
    const fulfillment = trueFalseFulfullment(answer, conv.data);
    const response = convertSSMLContainerToString(fulfillment.responseSSML);
    if (fulfillment.responseType === ResponseType.ASK) {
      conv.ask(response);
    } else {
      conv.close(response);
    }
  }
);

app.intent('News-Sport-Tech Round - no input', conv => {
  repromptRespond(questionRepromptFulfillment, noInput, conv);
});

app.intent('News-Sport-Tech Round - fallback', conv => {
  repromptRespond(questionRepromptFulfillment, unknownInput, conv);
});

app.intent('Quit App', conv => {
  const response = convertSSMLContainerToString(doNotPlayFulfillment());
  conv.close(response);
});

const repromptRespond = (
  f: (data: ConversationData, repromptAudio: string) => Response,
  repromptAudio: string,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
) => {
  const fulfillment = f(conv.data, repromptAudio);
  const response = convertSSMLContainerToString(fulfillment.responseSSML);
  if (fulfillment.responseType === ResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

const respond = (
  f: (data: ConversationData) => Response,
  conv: DialogflowConversation<ConversationData, {}, Contexts>
) => {
  const fulfillment = f(conv.data);
  const response = convertSSMLContainerToString(fulfillment.responseSSML);
  if (fulfillment.responseType === ResponseType.ASK) {
    conv.ask(response);
  } else {
    conv.close(response);
  }
};

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
