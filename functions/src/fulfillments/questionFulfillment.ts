import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/models';
import { OptionQuestion, Question, QuestionType } from '../models/questions';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../content/genericQuestionContent';

import { OptionTopic } from '../models/rounds';
import { buildSSMLAndCombineAudioResponses } from '../responses/ssmlResponses';
import { categories } from '../content/categoryContent';
import { unexpectedErrorResponse } from '../utils/logger';

const questionHelpFulfillment = (data: ConversationData) => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof Question) {
    const helpAudio = getQuestionSpecificHelpAudio(question.questionType);
    const response = buildSSMLAndCombineAudioResponses(
      helpAudio,
      question.questionAudio
    );
    return new Response(ResponseType.ASK, response);
  } else {
    return unexpectedErrorResponse(question.error);
  }
};

const getQuestionSpecificHelpAudio = (questionType: QuestionType): string => {
  switch (questionType) {
    case QuestionType.TRUEFALSE:
      return trueFalseHelp;
    case QuestionType.MULTIPLECHOICE:
      return multipleChoiceHelp;
    default:
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
};
