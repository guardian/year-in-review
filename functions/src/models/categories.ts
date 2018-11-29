import { Unknown } from './models';

class Categories {
  private categories: CategoryCollection[];

  constructor(categories: CategoryCollection[]) {
    this.categories = categories;
  }

  public getCategoryCollection(
    categoryCollectionNumber: number
  ): OptionCategoryCollection {
    if (categoryCollectionNumber > this.categories.length) {
      return new Unknown('out of bounds for category collection');
    } else {
      return this.categories[categoryCollectionNumber - 1];
    }
  }
}

class CategoryCollection {
  public introductionAudio: string;
  private topics: Set<Topic>;

  constructor(topics: Set<Topic>, introductionAudio: string) {
    this.topics = topics;
    this.introductionAudio = introductionAudio;
  }

  public getTopics(): Set<Topic> {
    return this.topics;
  }
}

type OptionCategoryCollection = CategoryCollection | Unknown;

enum Topic {
  SPORT = 'sport',
  NEWS = 'news',
  SCIENCE = 'science',
  TECH = 'tech',
  POLITICS = 'politics',
}

export { Topic, Categories, CategoryCollection, OptionCategoryCollection };
