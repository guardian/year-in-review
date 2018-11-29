import { CategoryCollection, Topic } from '../models/categories';
import { OptionQuestion, Question } from '../models/questions';
import { Response, ResponseType, UserData } from '../models/models';
import {
  buildSSMLAudioResponse,
  errorResponse,
} from '../responses/genericResponse';
import { categories, getRound } from '../content/categoriesContent';

import { incrementQuestionNumber } from './trueFalseFulfillment';

const startRound = (topicChoice: string, data: UserData): Response => {
  const topic: Topic = topicChoice as Topic;
  const round = getRound(topic);
  setTopic(data, topic);
  incrementQuestionNumber(data);
  const maybeQuestion: OptionQuestion = round.getQuestion(1);

  if (maybeQuestion instanceof Question) {
    return new Response(
      ResponseType.ASK,
      buildSSMLAudioResponse(maybeQuestion.questionAudio)
    );
  } else {
    return new Response(ResponseType.CLOSE, errorResponse);
  }
};

const setTopic = (data: UserData, topic: Topic): void => {
  data.currentTopic = topic;
};

const incrementCategoryNumber = (data: UserData) => {
  const currentCategory = data.currentCategory || 0;
  data.currentCategory = currentCategory + 1;
};

const selectCategory = (data: UserData): Response => {
  const categoryNumber = data.currentCategory || 1;
  const category = categories.getCategoryCollection(categoryNumber);
  incrementCategoryNumber(data);
  if (category instanceof CategoryCollection) {
    return new Response(
      ResponseType.ASK,
      buildSSMLAudioResponse(category.introductionAudio)
    );
  } else {
    return new Response(ResponseType.CLOSE, gameOver());
  }
};

const gameOver = () => {
  return 'Game over!';
};

export { selectCategory, startRound };
