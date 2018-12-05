import * as functions from 'firebase-functions';

import {
  doNotPlayFulfillment,
  helpAtStartFulfillment,
  invalidResponseFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
} from './fulfillments/welcomeFulfillment';
import {
  fallbackFulfillment,
  helpFulfillment,
  noInputFulfillment,
  repeatFulfillment,
} from './fulfillments/helperFulfillments';
import {
  fillInTheBlankIncorrectFulfillment,
  fillInTheBlankQuestionFulfillment,
  multipleChoiceQuestionFulfillment,
  trueFalseQuestionFulfillment,
} from './fulfillments/questionFulfillment';
import {
  respondBasedOnResponseType,
  respondToUserInput,
} from './responses/dialogflowResponses';

import { ConversationData } from './models/conversation';
import { convertSSMLContainerToString } from './responses/ssmlResponses';
import { dialogflow } from 'actions-on-google';
import { quit } from './fulfillments/endOfGameFulfillment';
import { startCategory } from './fulfillments/categoryFulfillment';

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
  respondBasedOnResponseType(startYearInReviewFulfillment, conv);
});

app.intent('Welcome Intent - fallback', conv => {
  respondBasedOnResponseType(invalidResponseFulfillment, conv);
});

app.intent('Welcome Intent - no input', conv => {
  respondBasedOnResponseType(invalidResponseFulfillment, conv);
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

app.intent('Help', conv => {
  respondBasedOnResponseType(helpFulfillment, conv);
});

app.intent('Repeat', conv => {
  respondBasedOnResponseType(repeatFulfillment, conv);
});

app.intent('No Input', conv => {
  respondBasedOnResponseType(noInputFulfillment, conv);
});

app.intent('Fallback', conv => {
  respondBasedOnResponseType(fallbackFulfillment, conv);
});

app.intent<{ topicChoice: string }>(
  'News-Sport Round',
  (conv, { topicChoice }) => {
    respondToUserInput(topicChoice, conv, startCategory);
  }
);

app.intent<{ answer: string }>(
  'News-Sport Round - trueFalse',
  (conv, { answer }) => {
    respondToUserInput(answer, conv, trueFalseQuestionFulfillment);
  }
);

app.intent<{ answer: string }>(
  'News-Sport Round - multipleChoice',
  (conv, { answer }) => {
    respondToUserInput(answer, conv, multipleChoiceQuestionFulfillment);
  }
);

app.intent<{ topicChoice: string }>(
  'Arts-Science Round',
  (conv, { topicChoice }) => {
    respondToUserInput(topicChoice, conv, startCategory);
  }
);

app.intent<{ answer: string }>(
  'Arts-Science Round - trueFalse',
  (conv, { answer }) => {
    respondToUserInput(answer, conv, trueFalseQuestionFulfillment);
  }
);

app.intent<{ answer: string }>(
  'Arts-Science Round - multipleChoice',
  (conv, { answer }) => {
    respondToUserInput(answer, conv, multipleChoiceQuestionFulfillment);
  }
);

app.intent<{ crispr: string }>(
  'Arts-Science Round - CRISPRQuestion',
  (conv, { crispr }) => {
    respondToUserInput(crispr, conv, fillInTheBlankQuestionFulfillment);
  }
);

app.intent('Arts-Science Round - fallback', conv => {
  respondBasedOnResponseType(fillInTheBlankIncorrectFulfillment, conv);
});

app.intent('Quit App', conv => {
  const response = convertSSMLContainerToString(quit());
  conv.close(response);
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .https.onRequest(app);
