import { CategoryCollection, Topic } from '../models/categories';
import { OptionQuestion, Question } from '../models/questions';
import { Response, ResponseType, UserData } from '../models/models';
import { categories, roundCollection } from '../content/categoriesContent';

import { QuizRound } from '../models/rounds';
import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { incrementQuestionNumber } from './trueFalseFulfillment';
import { unexpectedErrorAudio } from '../content/errorContent';

const startRound = (topicChoice: string, data: UserData): Response => {
  const topic: Topic = topicChoice as Topic;
  const round = roundCollection.getRound(topic);
  if (round instanceof QuizRound) {
    setTopic(data, topic);
    incrementQuestionNumber(data);
    const maybeQuestion: OptionQuestion = round.getQuestion(1);

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
