import { Category } from '../../models/categories';
import { Topic } from '../../models/rounds';
import { categories } from '../categoryContent';

describe('Content should be available for all categories', () => {
  test('Content is defined for all categories', () => {
    for (const t in Topic) {
      const topic: Topic = Topic[t] as Topic;
      expect(categories.getCategory(topic)).toBeInstanceOf(Category);
    }
  });
});
