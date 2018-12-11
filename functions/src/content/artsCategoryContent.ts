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
    'https://storage.googleapis.com/audio-assets/04.1_YiR_Arts_Q1.ogg',
    'Fill in the blank',
    'GAMBINO',
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q1_Correct.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q1_Wrong.ogg',
    'incorrect'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q2.ogg',
    'True or false',
    false,
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q2_False.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q2_True.ogg',
    'incorrect'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3.ogg',
    'Multiple Choice',
    MultipleChoice.D,
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3D.ogg',
    'D'
  ),
];

const artsOpening =
  'https://storage.googleapis.com/audio-assets/04.0_YiR_Arts_a.ogg';

const artsCategory = new Category(artsQuestions, artsOpening);

export { artsCategory };
