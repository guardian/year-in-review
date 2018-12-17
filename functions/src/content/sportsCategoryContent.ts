import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const sportsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1a.ogg',
    'True or false',
    false,
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_False.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_True.ogg',
    'incorrect'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/02.2_YiR_Sport_Q2b.ogg',
    'multiple choice',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2A.ogg',
    'A',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2B.ogg',
    'B',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2C.ogg',
    'C',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2D.ogg',
    'D'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3.ogg',
    'fill in the blank',
    'HARRY KANE',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Kane.ogg',
    'correct',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Not_Kane.ogg',
    'incorrect'
  ),
];

const sportsAudioOpening =
  'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_a.ogg';

const sportsTextOpening = 'Welcome to Sports';

const sportsCategory = new Category(
  sportsQuestions,
  sportsAudioOpening,
  sportsTextOpening
);

export { sportsCategory };
