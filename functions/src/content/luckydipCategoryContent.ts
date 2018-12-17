import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const luckydipQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1.ogg',
    'Multiple choice',
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1D.ogg',
    'D'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2.ogg',
    'true or false',
    true,
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_True.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_False.ogg',
    'incorrect'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3.ogg',
    'fill in the blank',
    'QUEEN',
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Queen.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Not_Queen.ogg',
    'incorrect'
  ),
];

const luckydipAudioOpening =
  'https://storage.googleapis.com/audio-assets/07.0_YiR_Lucky.ogg';

const luckyDipTextOpening = 'Welcome to lucky dip';

const luckydipCategory = new Category(
  luckydipQuestions,
  luckydipAudioOpening,
  luckyDipTextOpening
);

export { luckydipCategory };
