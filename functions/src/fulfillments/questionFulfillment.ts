import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  OptionBoolean,
  Response,
  ResponseType,
  Unknown,
} from '../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  OptionMultipleChoice,
  OptionQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';
import {
  buildFillInTheBlankIncorrectResponse,
  buildFillInTheBlankQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  buildTrueFalseQuestionResponse,
} from '../responses/questionResponses';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../content/genericQuestionContent';

import { OptionTopic } from '../models/rounds';
import { buildSSMLAndCombineAudioResponses } from '../responses/ssmlResponses';
import { categories } from '../content/categoryContent';
import { fallbackFulfillment } from './helperFulfillments';
import { unexpectedErrorResponse } from '../utils/logger';

const trueFalseQuestionFulfillment = (
  answer: string,
  data: ConversationData
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  const typedAnswer: OptionBoolean = convertStringToBoolean(answer);
  if (
    question instanceof TrueFalseQuestion &&
    typeof typedAnswer === 'boolean'
  ) {
    incrementQuestionNumber(data);
    const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(
      data
    );
    return buildTrueFalseQuestionResponse(
      data,
      question,
      nextQuestion,
      typedAnswer
    );
  } else {
    return fallbackFulfillment(data);
  }
};

const convertStringToBoolean = (s: string): OptionBoolean => {
  if (s.toLowerCase() === 'true') {
    return true;
  }
  if (s.toLowerCase() === 'false') {
    return false;
  } else {
    return new Unknown('could not convert string to boolean');
  }
};

const multipleChoiceQuestionFulfillment = (
  answer: string,
  data: ConversationData
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  const typedAnswer: OptionMultipleChoice = convertStringToMultipleChoice(
    answer
  );
  if (
    question instanceof MultipleChoiceQuestion &&
    !(typedAnswer instanceof Unknown)
  ) {
    incrementQuestionNumber(data);
    const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(
      data
    );
    return buildMultipleChoiceQuestionResponse(
      data,
      question,
      nextQuestion,
      typedAnswer
    );
  } else {
    return fallbackFulfillment(data);
  }
};

const convertStringToMultipleChoice = (s: string): OptionMultipleChoice => {
  if (s.toUpperCase() === 'A') {
    return MultipleChoice.A;
  }
  if (s.toUpperCase() === 'B') {
    return MultipleChoice.B;
  }
  if (s.toUpperCase() === 'C') {
    return MultipleChoice.C;
  }
  if (s.toUpperCase() === 'D') {
    return MultipleChoice.D;
  } else {
    return new Unknown('Could not convert string to multiple choice');
  }
};

const fillInTheBlankQuestionFulfillment = (
  answer: string,
  data: ConversationData
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof FillInTheBlankQuestion) {
    incrementQuestionNumber(data);
    const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(
      data
    );
    return buildFillInTheBlankQuestionResponse(
      data,
      question,
      nextQuestion,
      answer
    );
  } else {
    return fallbackFulfillment(data);
  }
};

const fillInTheBlankIncorrectFulfillment = (data: ConversationData) => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof FillInTheBlankQuestion) {
    incrementQuestionNumber(data);
    const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(
      data
    );
    return buildFillInTheBlankIncorrectResponse(data, question, nextQuestion);
  } else {
    return fallbackFulfillment(data);
  }
};

const incrementQuestionNumber = (data: ConversationData): void => {
  const currentQuestion = data.currentQuestion || 0;
  data.currentQuestion = currentQuestion + 1;
};

const questionHelpFulfillment = (data: ConversationData) => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof Question) {
    const helpAudio = getQuestionSpecificHelpAudio(question);
    const response = buildSSMLAndCombineAudioResponses(
      helpAudio,
      question.questionAudio
    );
    return new Response(ResponseType.ASK, response);
  } else {
    return unexpectedErrorResponse(question.error);
  }
};

const getQuestionSpecificHelpAudio = (question: Question): string => {
  if (question instanceof TrueFalseQuestion) {
    return trueFalseHelp;
  }
  if (question instanceof MultipleChoiceQuestion) {
    return multipleChoiceHelp;
  } else {
    return fillInTheBlankHelp;
  }
};

const questionRepromptFulfillment = (
  data: ConversationData,
  repromptAudio: string
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof Question) {
    const response = buildSSMLAndCombineAudioResponses(
      repromptAudio,
      question.questionAudio
    );
    return new Response(ResponseType.ASK, response);
  } else {
    return unexpectedErrorResponse(question.error);
  }
};

const getTopic = (data: ConversationData): OptionTopic => {
  if (typeof data.currentTopic === 'undefined') {
    return new Unknown('No topic found');
  } else {
    return data.currentTopic;
  }
};

const getQuestionBasedOnConversationData = (
  data: ConversationData
): OptionQuestion => {
  const topic: OptionTopic = getTopic(data);
  if (topic instanceof Unknown) {
    return new Unknown(`Could not get topic from conversation data ${data}`);
  } else {
    const questionNumber: number = data.currentQuestion || 1;
    const category: OptionCategory = categories.getCategory(topic);
    if (category instanceof Category) {
      return category.getQuestion(questionNumber);
    } else {
      return new Unknown(`Could not get category from topic ${topic}`);
    }
  }
};

export {
  questionRepromptFulfillment,
  getQuestionBasedOnConversationData,
  getTopic,
  questionHelpFulfillment,
  getQuestionSpecificHelpAudio,
  fillInTheBlankIncorrectFulfillment,
  trueFalseQuestionFulfillment,
  multipleChoiceQuestionFulfillment,
  fillInTheBlankQuestionFulfillment,
  incrementQuestionNumber,
};