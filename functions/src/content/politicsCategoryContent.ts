import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const politicsQuestions: Question[] = [
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1.ogg',
    'fill in the blank',
    'UNIVERSAL CREDIT',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Universal.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Not_Universal.ogg',
    'incorrect'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2.ogg',
    'Multiple choice',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2D.ogg',
    'D'
  ),

  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3.ogg',
    'true or false',
    false,
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_False.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_True.ogg',
    'incorreect'
  ),
];

const politicsOpening =
  'https://storage.googleapis.com/audio-assets/05.0_YiR_Politics.ogg';

const politicsCategory = new Category(politicsQuestions, politicsOpening);

export { politicsCategory };
