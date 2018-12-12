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
    'UNIVERSAL CREDIT',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Universal.ogg',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Not_Universal.ogg'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2.ogg',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2A.ogg',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2B.ogg',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2C.ogg',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2D.ogg'
  ),

  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3.ogg',
    false,
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_False.ogg',
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_True.ogg'
  ),
];

const politicsOpening =
  'https://storage.googleapis.com/audio-assets/05.0_YiR_Politics.ogg';

const politicsCategory = new Category(politicsQuestions, politicsOpening);

export { politicsCategory };
