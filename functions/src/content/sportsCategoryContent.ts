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
    false,
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_False.ogg',
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_True.ogg'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/02.2_YiR_Sport_Q2b.ogg',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2A.ogg',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2B.ogg',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2C.ogg',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2D.ogg'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3.ogg',
    'HARRY KANE',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Kane.ogg',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Not_Kane.ogg'
  ),
];

const sportsOpening =
  'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_a.ogg';

const sportsCategory = new Category(sportsQuestions, sportsOpening);

export { sportsCategory };
