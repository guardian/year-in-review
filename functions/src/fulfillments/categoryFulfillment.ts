import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
} from '../models/conversation';
import { OptionQuestion, Question } from '../models/questions';

import { Category } from '../models/categories';
import { Topic } from '../models/rounds';
import { buildSSMLAndCombineAudioResponses } from '../responses/ssmlResponses';
import { categories } from '../content/categoryContent';
import { unexpectedErrorResponse } from '../utils/logger';
import { combineTextResponses } from '../responses/textResponses';
import { Container } from 'fluent-ssml';

const startCategory = (
  topicChoice: string | Topic,
  data: ConversationData
): DialogflowResponse => {
  const topic: Topic = topicChoice as Topic;
  const category = categories.getCategory(topic);
  if (category instanceof Category) {
    setTopic(data, topic);
    setQuestionNumber(data);
    const maybeQuestion: OptionQuestion = category.getQuestion(1);

    if (maybeQuestion instanceof Question) {
      const audioResponse: [
        Container,
        Container
      ] = buildSSMLAndCombineAudioResponses(
        category.openingAudio,
        maybeQuestion.questionAudio
      );
      const textResponse = combineTextResponses(
        category.openingText,
        maybeQuestion.questionText
      );
      return new DialogflowResponse(
        DialogflowResponseType.ASK,
        audioResponse,
        textResponse,
        maybeQuestion.suggestionChips
      );
    } else {
      return unexpectedErrorResponse(
        `No first question found for category ${category}`
      );
    }
  } else {
    return unexpectedErrorResponse(`No category found for topic ${topic}`);
  }
};

const setTopic = (data: ConversationData, topic: Topic): void => {
  data.currentTopic = topic;
};

const setQuestionNumber = (data: ConversationData): void => {
  data.currentQuestion = 1;
};

export { startCategory };
