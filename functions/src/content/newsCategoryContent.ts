import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const newsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1a.ogg',
    'True or false',
    false,
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_False.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_True.ogg',
    'incorrect'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2a.ogg',
    'Multiple Choice',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_D.ogg',
    'D'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3.ogg',
    'Lucky dip',
    'SAUDI ARABIA',
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3_Saudi.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3_Not_Saudi.ogg',
    'incorrect'
  ),
];

const newsAudioOpening =
  'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_a.ogg';

const newsTextOpening = 'Welcome to news';

const newsCategory = new Category(
  newsQuestions,
  newsAudioOpening,
  newsTextOpening
);

export { newsCategory };
