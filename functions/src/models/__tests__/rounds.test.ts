import { RoundCollection, Rounds } from '../rounds';

import { Unknown } from '../models';

describe('Rounds', () => {
  test('getRoundCollection returns Unknown object when roundCollectionNumber is out of bounds', () => {
    const rounds = new Rounds([]);
    expect(rounds.getRoundCollection(1)).toBeInstanceOf(Unknown);
  });

  test('getRoundCollection returns RoundCollection object when roundCollectionNumber is in bounds', () => {
    const roundCollection = new RoundCollection('', new Set());
    const rounds = new Rounds([roundCollection]);
    expect(rounds.getRoundCollection(1)).toBeInstanceOf(RoundCollection);
  });
});
