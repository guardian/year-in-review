import { Categories, CategoryCollection } from '../models/categories';

import { sportsCategory } from './sportsCategoryContent';

const categoryCollection: CategoryCollection = {
  sport: sportsCategory(),
  news: sportsCategory(),
  science: sportsCategory(),
  politics: sportsCategory(),
  tech: sportsCategory(),
};

const categories: Categories = new Categories(categoryCollection);

export { categories };
