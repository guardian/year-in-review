import { RoundCollection, Rounds, Topic } from '../models/rounds';

const roundCollections: RoundCollection[] = [
  new RoundCollection(
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    'https://s3.amazonaws.com/audiolab-audio/helpSportNewsTech.mp3',
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    new Set([Topic.SPORT, Topic.NEWS, Topic.TECH])
  ),
  new RoundCollection(
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceSciencePolitics.mp3',
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceSciencePolitics.mp3',
    'https://s3.amazonaws.com/audiolab-audio/helpSciencePolitics.mp3',
    'https://s3.amazonaws.com/audiolab-audio/categoryChoiceNewsSportTech.mp3',
    new Set([Topic.SCIENCE, Topic.POLITICS])
  ),
];

const rounds: Rounds = new Rounds(roundCollections);

export { rounds };
