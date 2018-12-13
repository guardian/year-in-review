import { Categories, CategoryCollection } from '../models/categories';

import { artsCategory } from './artsCategoryContent';
import { newsCategory } from './newsCategoryContent';
import { scienceCategory } from './scienceCategoryContent';
import { sportsCategory } from './sportsCategoryContent';
import { politicsCategory } from './politicsCategoryContent';
import { technologyCategory } from './technologyCategoryContent';
import { luckydipCategory } from './luckydipCategoryContent';

const categoryCollection: CategoryCollection = {
  sport: sportsCategory,
  news: newsCategory,
  science: scienceCategory,
  arts: artsCategory,
  politics: politicsCategory,
  technology: technologyCategory,
  luckydip: luckydipCategory,
};

const categories: Categories = new Categories(categoryCollection);

export { categories };
