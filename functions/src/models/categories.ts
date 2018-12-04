import { OptionQuestion, Question } from './questions';

import { Topic } from './rounds';
import { Unknown } from './conversation';

class Category {
  constructor(private questions: Question[], public teaserAudio: string) {}

  public getQuestion(questionNumber: number): OptionQuestion {
    if (questionNumber > this.questions.length) {
      return new Unknown('out of bounds');
    } else {
      return this.questions[questionNumber - 1];
    }
  }
}

class Categories {
  constructor(private categoryCollection: CategoryCollection) {}

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
