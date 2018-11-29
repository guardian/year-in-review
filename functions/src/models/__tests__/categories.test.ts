import { Categories, CategoryCollection } from '../categories';

import { Unknown } from '../models';

describe('Categories', () => {
  test('getCategoryCollection returns Unknown object when categoryCollectionNumber is out of bounds', () => {
    const categories = new Categories([]);
    expect(categories.getCategoryCollection(1)).toBeInstanceOf(Unknown);
  });

  test('getCategoryCollection returns CategoryCollection object when categoryCollectionNumber is in bounds', () => {
    const categoryCollection = new CategoryCollection('', new Set());
    const categories = new Categories([categoryCollection]);
    expect(categories.getCategoryCollection(1)).toBeInstanceOf(
      CategoryCollection
    );
  });
});
