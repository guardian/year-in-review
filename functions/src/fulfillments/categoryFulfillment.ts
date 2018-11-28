import { Response, ResponseType, UserData } from '../models/models';

import { CategoryCollection } from '../models/categories';
import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { categories } from '../content/categoriesContent';

const getCategoryIntroduction = (data: UserData): Response => {
  const categoryNumber = data.currentCategory || 1;
  const category = categories.getCategoryCollection(categoryNumber);
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

export { getCategoryIntroduction };
