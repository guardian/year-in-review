import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const luckydipQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1.ogg',
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1A.ogg',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1B.ogg',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1C.ogg',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1D.ogg'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2.ogg',
    true,
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_True.ogg',
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_False.ogg'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3.ogg',
    'QUEEN',
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Queen.ogg',
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Not_Queen.ogg'
  ),
];

const luckydipOpening =
  'https://storage.googleapis.com/audio-assets/07.0_YiR_Lucky.ogg';

const luckydipCategory = new Category(luckydipQuestions, luckydipOpening);

export { luckydipCategory };
