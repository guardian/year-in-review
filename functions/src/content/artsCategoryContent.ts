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
    'GAMBINO',
    'https://storage.googleapis.com/audio-assets/04.1_YiR_Arts_Q1_Correct.ogg',
    'https://storage.googleapis.com/audio-assets/04.1_YiR_Arts_Q1_Wrong.ogg'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q2.ogg',
    false,
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q2_False.ogg',
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q2_True.ogg'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3.ogg',
    MultipleChoice.D,
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3A.ogg',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3B.ogg',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3C.ogg',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3D.ogg'
  ),
];

const artsOpening = 'https://storage.googleapis.com/audio-assets/04.0_YiR_Arts_a.ogg'

const artsCategory = () => new Category(artsQuestions, artsOpening);

export { artsCategory };
