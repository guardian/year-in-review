import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/models';
import { OptionQuestion, Question } from '../models/questions';

import { OptionTopic } from '../models/rounds';
import { buildFeedbackQuestionSSMLAudioResponse } from '../responses/genericResponse';
import { categories } from '../content/categoryContent';
import { unexpectedErrorResponse } from '../utils/logger';
import { unknownInput } from '../content/genericQuestionContent';

const questionFallbackFulfillment = (data: ConversationData): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  if (question instanceof Question) {
    const response = buildFeedbackQuestionSSMLAudioResponse(
      unknownInput,
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

export { questionFallbackFulfillment, getQuestionBasedOnConversationData };
