import { Categories, Category, QuizRound } from '../models/models';

import { sportsRound } from './sportsRoundContent';

const categoriesContent: Categories = {
  sport: sportsRound(),
};

const getRound = (category: Category): QuizRound => {
  return categoriesContent[category];
};

export { getRound };
