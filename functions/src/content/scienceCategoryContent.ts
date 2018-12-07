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
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_A.ogg',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_B.ogg',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_C.ogg',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_D.ogg'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2a.ogg',
    'CRISPR',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_True.ogg',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_False.ogg'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3.ogg',
    true,
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_True.ogg',
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_False.ogg'
  ),
];

const scienceOpening =
  'https://storage.googleapis.com/audio-assets/03.0_YiR_Science_a.ogg';

const scienceCategory = new Category(scienceQuestions, scienceOpening);

export { scienceCategory };
