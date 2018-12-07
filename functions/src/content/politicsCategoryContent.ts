import {
  MultipleChoiceQuestion,
  MultipleChoice,
  Question,
  TrueFalseQuestion,
} from '../models/questions';
import { Category } from '../models/categories';

const politicsQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1.ogg',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1A.ogg',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1B.ogg',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1C.ogg',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1D.ogg'
  ),

  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/05.4_YiR_Politics_Q2.ogg',
    false,
    'https://storage.googleapis.com/audio-assets/05.4_YiR_Politics_Q2_False.ogg',
    'https://storage.googleapis.com/audio-assets/05.4_YiR_Politics_Q2_True.ogg'
  ),
];

const politicsOpening =
  'https://storage.googleapis.com/audio-assets/05.0_YiR_Politics.ogg';

const politicsCategory = new Category(politicsQuestions, politicsOpening);

export { politicsCategory };
