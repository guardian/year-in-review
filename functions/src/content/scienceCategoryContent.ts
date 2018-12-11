import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const scienceQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1.ogg',
    'Multiple Choice',
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_D.ogg',
    'D'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2a.ogg',
    'Fill in the blank',
    'CRISPR',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_CRISPR.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_not_CRISPR.ogg',
    'incorrect'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3.ogg',
    'True or false',
    true,
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_True.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_False.ogg',
    'incorrect'
  ),
];

const scienceOpening =
  'https://storage.googleapis.com/audio-assets/03.0_YiR_Science_a.ogg';

const scienceCategory = new Category(scienceQuestions, scienceOpening);

export { scienceCategory };
