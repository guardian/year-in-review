import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const technologyQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1.ogg',
    'true or false',
    true,
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_True.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_False.ogg',
    'incorrect'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2.ogg',
    'multiple choice',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2D.ogg',
    'D'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3.ogg',
    'fill in the blank',
    'GDPR',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_GDPR.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_Not_GDPR.ogg',
    'incorrect'
  ),
];

const technologyOpening =
  'https://storage.googleapis.com/audio-assets/06.0_YiR_Technology.ogg';

const technologyCategory = new Category(technologyQuestions, technologyOpening);

export { technologyCategory };
