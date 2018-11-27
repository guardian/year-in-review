import { Category } from '../../models/models';
import { getRound } from '../categoriesContent';

describe('Content should be available for all categories', () => {
  test('Content is defined for all categories', () => {
    for (const c in Category) {
      const category: Category = Category[c] as Category;
      expect(getRound(category)).toBeDefined();
    }
  });
});
