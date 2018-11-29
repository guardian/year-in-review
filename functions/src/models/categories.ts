import { OptionQuestion, Question } from './questions';

import { Topic } from './rounds';
import { Unknown } from './models';

class Category {
  private questions: Question[];

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  public getQuestion(questionNumber: number): OptionQuestion {
    if (questionNumber > this.questions.length) {
      return new Unknown('out of bounds');
    } else {
      // Indexing starting from 0
      return this.questions[questionNumber - 1];
    }
  }
}

class Categories {
  private categoryCollection: CategoryCollection;

  constructor(categoryCollection: CategoryCollection) {
    this.categoryCollection = categoryCollection;
  }

  public getCategory(topic: Topic): OptionCategory {
    const category = this.categoryCollection[topic];
    if (typeof category === 'undefined') {
      return new Unknown('category not defined for this topic');
    } else {
      return category;
    }
  }
}

interface CategoryCollection {
  [key: string]: Category;
}

type OptionCategory = Category | Unknown;

export { Category, Categories, CategoryCollection, OptionCategory };
