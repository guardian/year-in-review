import { Round } from '../../models/rounds';
import { Topic } from '../../models/categories';
import { rounds } from '../roundsContent';

describe('Content should be available for all categories', () => {
  test('Content is defined for all categories', () => {
    for (const t in Topic) {
      const topic: Topic = Topic[t] as Topic;
      expect(rounds.getRound(topic)).toBeInstanceOf(Round);
    }
  });
});
