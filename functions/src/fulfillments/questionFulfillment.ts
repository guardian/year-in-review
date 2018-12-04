import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/conversation';
import {
  MultipleChoiceQuestion,
  OptionQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../content/genericQuestionContent';

import { OptionTopic } from '../models/rounds';
import { buildQuestionResponse } from '../responses/questionResponses';
import { buildSSMLAndCombineAudioResponses } from '../responses/ssmlResponses';
import { categories } from '../content/categoryContent';
import { unexpectedErrorResponse } from '../utils/logger';

const questionFulfillment = (
  answer: string,
  data: ConversationData
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  incrementQuestionNumber(data);
  const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(data);

  return buildQuestionResponse(data, question, nextQuestion, answer);
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
  questionFulfillment,
  questionRepromptFulfillment,
  getQuestionBasedOnConversationData,
  getTopic,
  questionHelpFulfillment,
  getQuestionSpecificHelpAudio,
};
