import * as functions from 'firebase-functions';

import { dialogflow } from 'actions-on-google';
import {
  helpWelcomeFulfillment,
  startYearInReviewFulfillment,
  welcomeFulfillment,
  unrecognisedInputWelcomeFulfillment,
  repeatWelcomeFulfillment,
  noInputWelcomeFulfillment,
  welcomeFulfillmentWithTypingWarning,
} from './fulfillments/welcomeFulfillment';
import {
  helpFulfillment,
  noInputFulfillment,
  repeatFulfillment,
} from './fulfillments/helperFulfillments';
import {
  fillInTheBlankQuestionIncorrectFulfillment,
  fillInTheBlankQuestionCorrectFulfillment,
  multipleChoiceQuestionFulfillment,
  trueFalseQuestionFulfillment,
} from './fulfillments/questionFulfillment';
import {
  respondBasedOnResponseType,
  respondBasedOnUserInput,
} from './responses/dialogflowResponses';

import { ConversationData } from './models/conversation';
import { quit } from './fulfillments/endOfGameFulfillment';
import { startCategory } from './fulfillments/categoryFulfillment';

const app = dialogflow<ConversationData, {}>({
  debug: true,
});

app.intent('Welcome Intent', conv => {
  if (conv.input.type === 'KEYBOARD') {
    respondBasedOnResponseType(welcomeFulfillmentWithTypingWarning, conv);
  } else {
    respondBasedOnResponseType(welcomeFulfillment, conv);
  }
});

app.intent('Welcome Intent - ready', conv => {
  // Removing the welcome intent contexts
  conv.contexts.set('welcomeintent-followup', 0);
  conv.contexts.set('welcomeintent-help-followup', 0);
  conv.data.finishedWelcomeIntent = true;
  respondBasedOnResponseType(startYearInReviewFulfillment, conv);
});

app.intent('Welcome Intent - repeat', conv => {
  respondBasedOnResponseType(repeatWelcomeFulfillment, conv);
});

app.intent('Welcome Intent - fallback', conv => {
  respondBasedOnResponseType(unrecognisedInputWelcomeFulfillment, conv);
});

app.intent('Welcome Intent - no input', conv => {
  respondBasedOnResponseType(noInputWelcomeFulfillment, conv);
});

app.intent('Welcome Intent - help', conv => {
  respondBasedOnResponseType(helpWelcomeFulfillment, conv);
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
  // Fallback might be due to a fill in the blank conversation being answered incorrectly
  respondBasedOnResponseType(fillInTheBlankQuestionIncorrectFulfillment, conv);
});

app.intent<{ answer: string }>('True False', (conv, { answer }) => {
  respondBasedOnUserInput(answer, conv, trueFalseQuestionFulfillment);
});

app.intent<{ answer: string }>('Multiple Choice', (conv, { answer }) => {
  respondBasedOnUserInput(answer, conv, multipleChoiceQuestionFulfillment);
});

app.intent<{ topicChoice: string }>(
  'News-Sport Round',
  (conv, { topicChoice }) => {
    respondBasedOnUserInput(topicChoice, conv, startCategory);
  }
);

app.intent<{ saudi: string }>(
  'News-Sport Round - SaudiArabiaQuestion',
  (conv, { saudi }) => {
    respondBasedOnUserInput(
      saudi,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ kane: string }>(
  'News-Sport Round - HarryKaneQuestion',
  (conv, { kane }) => {
    respondBasedOnUserInput(
      kane,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ topicChoice: string }>(
  'Arts-Science Round',
  (conv, { topicChoice }) => {
    respondBasedOnUserInput(topicChoice, conv, startCategory);
  }
);

app.intent<{ crispr: string }>(
  'Arts-Science Round - CRISPRQuestion',
  (conv, { crispr }) => {
    respondBasedOnUserInput(
      crispr,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ gambino: string }>(
  'Arts-Science Round - GambinoQuestion',
  (conv, { gambino }) => {
    respondBasedOnUserInput(
      gambino,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ topicChoice: string }>(
  'Tech-Politics Round',
  (conv, { topicChoice }) => {
    respondBasedOnUserInput(topicChoice, conv, startCategory);
  }
);

app.intent<{ gdpr: string }>(
  'Tech-Politics Round - GDPRQuestion',
  (conv, { gdpr }) => {
    respondBasedOnUserInput(
      gdpr,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ credit: string }>(
  'Tech-Politics Round - UniversalCreditQuestion',
  (conv, { credit }) => {
    respondBasedOnUserInput(
      credit,
      conv,
      fillInTheBlankQuestionCorrectFulfillment
    );
  }
);

app.intent<{ queen: string }>('QueenQuestion', (conv, { queen }) => {
  respondBasedOnUserInput(
    queen,
    conv,
    fillInTheBlankQuestionCorrectFulfillment
  );
});

app.intent('Quit App', conv => {
  respondBasedOnResponseType(quit, conv);
});

exports.yearInReviewFulfillment = functions
  .region('europe-west1')
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(app);
