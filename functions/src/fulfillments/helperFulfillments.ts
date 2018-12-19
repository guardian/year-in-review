import {
  ConversationData,
  DialogflowResponse,
  Unknown,
  MultimediaResponse,
} from '../models/conversation';
import { getTopic, questionRepromptFulfillment } from './questionFulfillment';
import {
  trueFalseHelpAudio,
  multipleChoiceHelpAudio,
  fillInTheBlankHelpAudio,
  trueFalseUnknownInputAudio,
  multipleChoiceUnknownInputAudio,
  fillInTheBlankUnknownInputAudio,
  trueFalseNoInputAudio,
  multipleChoiceNoInputAudio,
  fillInTheBlankNoInputAudio,
  trueFalseHelpText,
  multipleChoiceHelpText,
  fillInTheBlankHelpText,
  trueFalseUnknownInputText,
  multipleChoiceUnknownInputText,
  fillInTheBlankUnknownInputText,
  multipleChoiceNoInputText,
  fillInTheBlankNoInputText,
  repeatAudio,
  repeatText,
} from '../content/genericQuestionContent';
import {
  roundFallbackFulfillment,
  roundHelpFulfillment,
  roundNoInputFulfillment,
  roundRepeatFullfillment,
} from './roundFulfillment';
import {
  Question,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
} from '../models/questions';
import { unrecognisedInputWelcomeFulfillment } from './welcomeFulfillment';

const helpFulfillment = (data: ConversationData): DialogflowResponse => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundHelpFulfillment(data);
  } else {
    return questionRepromptFulfillment(data, getQuestionSpecificHelpAudio);
  }
};

const noInputFulfillment = (data: ConversationData): DialogflowResponse => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundNoInputFulfillment(data);
  } else {
    return questionRepromptFulfillment(data, getQuestionSpecificNoInputAudio);
  }
};

const fallbackFulfillment = (data: ConversationData): DialogflowResponse => {
  const topic = getTopic(data);
  if (!data.finishedWelcomeIntent) {
    return unrecognisedInputWelcomeFulfillment(data);
  }
  if (topic instanceof Unknown) {
    return roundFallbackFulfillment(data);
  } else {
    return questionRepromptFulfillment(
      data,
      getQuestionSpecificUnknownInputAudio
    );
  }
};

const repeatFulfillment = (data: ConversationData): DialogflowResponse => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return roundRepeatFullfillment(data);
  } else {
    return questionRepromptFulfillment(
      data,
      () => new MultimediaResponse(repeatAudio, repeatText)
    );
  }
};

const getQuestionSpecificHelpAudio = (
  question: Question
): MultimediaResponse => {
  if (question instanceof TrueFalseQuestion) {
    return new MultimediaResponse(trueFalseHelpAudio, trueFalseHelpText);
  }
  if (question instanceof MultipleChoiceQuestion) {
    return new MultimediaResponse(
      multipleChoiceHelpAudio,
      multipleChoiceHelpText
    );
  } else {
    return new MultimediaResponse(
      fillInTheBlankHelpAudio,
      fillInTheBlankHelpText
    );
  }
};

const getQuestionSpecificUnknownInputAudio = (
  question: Question
): MultimediaResponse => {
  if (question instanceof TrueFalseQuestion) {
    return new MultimediaResponse(
      trueFalseUnknownInputAudio,
      trueFalseUnknownInputText
    );
  }
  if (question instanceof MultipleChoiceQuestion) {
    return new MultimediaResponse(
      multipleChoiceUnknownInputAudio,
      multipleChoiceUnknownInputText
    );
  } else {
    return new MultimediaResponse(
      fillInTheBlankUnknownInputAudio,
      fillInTheBlankUnknownInputText
    );
  }
};

const getQuestionSpecificNoInputAudio = (
  question: Question
): MultimediaResponse => {
  if (question instanceof TrueFalseQuestion) {
    return new MultimediaResponse(
      trueFalseNoInputAudio,
      trueFalseUnknownInputText
    );
  }
  if (question instanceof MultipleChoiceQuestion) {
    return new MultimediaResponse(
      multipleChoiceNoInputAudio,
      multipleChoiceNoInputText
    );
  } else {
    return new MultimediaResponse(
      fillInTheBlankNoInputAudio,
      fillInTheBlankNoInputText
    );
  }
};

export {
  helpFulfillment,
  noInputFulfillment,
  fallbackFulfillment,
  repeatFulfillment,
};
