import {
  Categories,
  CategoryCollection,
  Rounds,
  Topic,
} from '../models/categories';

import { QuizRound } from '../models/questions';
import { sportsRound } from './sportsRoundContent';

const roundsByTopic: Rounds = {
  sport: sportsRound(),
};

const categoryCollections: CategoryCollection[] = [
  new CategoryCollection(
    new Set([Topic.SPORT, Topic.NEWS, Topic.TECH]),
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3'
  ),
  new CategoryCollection(new Set([Topic.SCIENCE, Topic.POLITICS]), ''),
];

const categories: Categories = new Categories(categoryCollections);

const getRound = (topic: Topic): QuizRound => {
  return roundsByTopic[topic];
};

export { getRound, categories };
