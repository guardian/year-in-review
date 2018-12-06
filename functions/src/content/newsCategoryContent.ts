import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const newsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1a.ogg',
    false,
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_False.ogg',
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_True.ogg'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2a.ogg',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_A.ogg',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_B.ogg',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_C.ogg',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_D.ogg'
  ),
];

const newsOpening = 'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_a.ogg'

const newsCategory = () => new Category(newsQuestions, newsOpening);

export { newsCategory };
