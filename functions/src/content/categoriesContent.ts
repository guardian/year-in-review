import { Categories, CategoryCollection, Topic } from '../models/categories';
import { RoundCollection, Rounds } from '../models/rounds';

import { sportsRound } from './sportsRoundContent';

const rounds: Rounds = {
  sport: sportsRound(),
  news: sportsRound(),
  science: sportsRound(),
  politics: sportsRound(),
  tech: sportsRound(),
};

const roundCollection: RoundCollection = new RoundCollection(rounds);

const categoryCollections: CategoryCollection[] = [
  new CategoryCollection(
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    new Set([Topic.SPORT, Topic.NEWS, Topic.TECH])
  ),
  new CategoryCollection('', new Set([Topic.SCIENCE, Topic.POLITICS])),
];

const categories: Categories = new Categories(categoryCollections);

export { roundCollection, categories };
