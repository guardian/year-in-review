import { QuizRound } from '../../models/rounds';
import { Topic } from '../../models/categories';
import { roundCollection } from '../categoriesContent';

describe('Content should be available for all categories', () => {
  test('Content is defined for all categories', () => {
    for (const t in Topic) {
      const topic: Topic = Topic[t] as Topic;
      expect(roundCollection.getRound(topic)).toBeInstanceOf(QuizRound);
    }
  });
});
