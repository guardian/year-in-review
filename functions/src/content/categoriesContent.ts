import { Categories, CategoryCollection, Topic } from '../models/categories';

const categoryCollections: CategoryCollection[] = [
  new CategoryCollection(
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    new Set([Topic.SPORT, Topic.NEWS, Topic.TECH])
  ),
  new CategoryCollection('', new Set([Topic.SCIENCE, Topic.POLITICS])),
];

const categories: Categories = new Categories(categoryCollections);

export { categories };
