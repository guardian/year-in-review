import { RoundCollection, Rounds, Topic } from '../models/rounds';

const roundCollections: RoundCollection[] = [
  new RoundCollection(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/categoryChoiceNewsSportTech.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/helpSportNewsTech.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/repeatSportsNewsTech.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/silenceSportNewsTech.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/silenceSportNewsTech.mp3',
    new Set([Topic.SPORT, Topic.NEWS])
  ),
  new RoundCollection(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/categoryChoiceSciencePolitics.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/helpSciencePolitics.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/repeatSciencePolitics.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/silenceSciencePolitics.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/silenceSciencePolitics.mp3',
    new Set([Topic.SCIENCE, Topic.ARTS])
  ),
];

const rounds: Rounds = new Rounds(roundCollections);

export { rounds };
