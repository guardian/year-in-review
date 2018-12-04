import {
  FillInTheBlankQuestion,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const scienceQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techOpener.mp3',
    'false',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Incorrect.mp3'
  ),
  new FillInTheBlankQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2.mp3',
    'CRISPR',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3'
  ),
  new TrueFalseQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2.mp3',
    true,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3'
  ),
];

const sciencdPodcastTeaser =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/teaser.mp3';

const scienceCategory = () =>
  new Category(scienceQuestions, sciencdPodcastTeaser);

export { scienceCategory };
