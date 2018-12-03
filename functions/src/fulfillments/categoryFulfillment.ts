import { ConversationData, Response, ResponseType } from '../models/models';
import { OptionQuestion, Question } from '../models/questions';

import { Category } from '../models/categories';
import { Topic } from '../models/rounds';
import { buildSSMLAudioResponse } from '../responses/ssmlResponses';
import { categories } from '../content/categoryContent';
import { unexpectedErrorResponse } from '../utils/logger';

const startCategory = (
  topicChoice: string | Topic,
  data: ConversationData
): Response => {
  const topic: Topic = topicChoice as Topic;
  const category = categories.getCategory(topic);
  if (category instanceof Category) {
    setTopic(data, topic);
    setQuestionNumber(data);
    const maybeQuestion: OptionQuestion = category.getQuestion(1);

    if (maybeQuestion instanceof Question) {
      return new Response(
        ResponseType.ASK,
        buildSSMLAudioResponse(maybeQuestion.questionAudio)
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
