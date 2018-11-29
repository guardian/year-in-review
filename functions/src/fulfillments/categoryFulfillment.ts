import { ConversationData, Response, ResponseType } from '../models/models';
import { OptionQuestion, Question } from '../models/questions';

import { Category } from '../models/categories';
import { Topic } from '../models/rounds';
import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { categories } from '../content/categoryContent';
import { incrementQuestionNumber } from './trueFalseFulfillment';
import { unexpectedErrorAudio } from '../content/errorContent';

const startCategory = (
  topicChoice: string,
  data: ConversationData
): Response => {
  const topic: Topic = topicChoice as Topic;
  const category = categories.getCategory(topic);
  if (category instanceof Category) {
    setTopic(data, topic);
    incrementQuestionNumber(data);
    const maybeQuestion: OptionQuestion = category.getQuestion(1);

    if (maybeQuestion instanceof Question) {
      return new Response(
        ResponseType.ASK,
        buildSSMLAudioResponse(maybeQuestion.questionAudio)
      );
    } else {
      return new Response(
        ResponseType.CLOSE,
        buildSSMLAudioResponse(unexpectedErrorAudio)
      );
    }
  } else {
    return new Response(
      ResponseType.CLOSE,
      buildSSMLAudioResponse(unexpectedErrorAudio)
    );
  }
};

const setTopic = (data: ConversationData, topic: Topic): void => {
  data.currentTopic = topic;
};

export { startCategory };
