import { Categories, Category } from '../models/categories';

import { QuizRound } from '../models/questions';
import { sportsRound } from './sportsRoundContent';

const categoriesContent: Categories = {
  sport: sportsRound(),
};

const getRound = (category: Category): QuizRound => {
  return categoriesContent[category];
};

export { getRound };
