import { Categories, CategoryCollection } from '../models/categories';

import { artsCategory } from './artsCategoryContent';
import { newsCategory } from './newsCategoryContent';
import { scienceCategory } from './scienceCategoryContent';
import { sportsCategory } from './sportsCategoryContent';

const categoryCollection: CategoryCollection = {
  sport: sportsCategory(),
  news: newsCategory(),
  science: scienceCategory(),
  arts: artsCategory(),
};

const categories: Categories = new Categories(categoryCollection);

export { categories };
