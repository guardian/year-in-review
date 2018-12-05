import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const artsQuestions: Question[] = [
  new FillInTheBlankQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techOpener.mp3',
    'false',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ1Incorrect.mp3'
  ),
  new TrueFalseQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2.mp3',
    true,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3'
  ),
  new MultipleChoiceQuestion(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2.mp3',
    MultipleChoice.A,
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/techQ2Incorrect.mp3'
  ),
];

const artsPodcastTeaser =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/teaser.mp3';

const artsCategory = () => new Category(artsQuestions, artsPodcastTeaser);

export { artsCategory };
