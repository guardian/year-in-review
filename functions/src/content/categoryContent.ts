import { Categories, CategoryCollection } from '../models/categories';

import { newsCategory } from './newsCategoryContent';
import { sportsCategory } from './sportsCategoryContent';
import { techCategory } from './techCategoryContent';

const categoryCollection: CategoryCollection = {
  sport: sportsCategory(),
  news: newsCategory(),
  science: sportsCategory(),
  politics: sportsCategory(),
  tech: techCategory(),
};

const categories: Categories = new Categories(categoryCollection);

export { categories };
