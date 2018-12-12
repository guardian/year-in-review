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
    true,
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_True.ogg',
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_False.ogg'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2.ogg',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2A.ogg',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2B.ogg',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2C.ogg',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2D.ogg'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3.ogg',
    'GDPR',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_GDPR.ogg',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_Not_GDPR.ogg'
  ),
];

const technologyOpening =
  'https://storage.googleapis.com/audio-assets/06.0_YiR_Technology.ogg';

const technologyCategory = new Category(technologyQuestions, technologyOpening);

export { technologyCategory };
