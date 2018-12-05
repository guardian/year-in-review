import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const sportsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsOpener.mp3',
    true,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ1Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ1Incorrect.mp3'
  ),
  new MultipleChoiceQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2.mp3',
    MultipleChoice.D,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Correct.mp3'
  ),
  new TrueFalseQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2.mp3',
    true,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3'
  ),
];

const sportsPodcastTeaser =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/teaser.mp3';

const sportsCategory = () => new Category(sportsQuestions, sportsPodcastTeaser);

export { sportsCategory };
