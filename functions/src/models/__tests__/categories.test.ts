import { Categories, Category, CategoryCollection } from '../categories';
import { Question, QuestionType } from '../questions';

import { Topic } from '../rounds';
import { Unknown } from '../conversation';

describe('Category', () => {
  test('return an Unknown object if question number is out of range', () => {
    const category = new Category([]);
    expect(category.getQuestion(1)).toBeInstanceOf(Unknown);
  });

  test('return an Question object if question number is in range', () => {
    const question = new Question('', '', '', '', QuestionType.TRUEFALSE);
    const category = new Category([question]);
    expect(category.getQuestion(1)).toBeInstanceOf(Question);
  });
});

describe('Category Collection', () => {
  test('return Unknown object if Category not defined for the topic', () => {
    const categories = new Categories({});
    expect(categories.getCategory(Topic.NEWS)).toBeInstanceOf(Unknown);
  });

  test('return Unknown object if Category not defined for the topic', () => {
    const categoryCollection: CategoryCollection = { news: new Category([]) };
    const category: Categories = new Categories(categoryCollection);
    expect(category.getCategory(Topic.NEWS)).toBeInstanceOf(Category);
  });
});
