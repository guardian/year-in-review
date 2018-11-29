import { Question, QuestionType } from '../models/questions';

import { Category } from '../models/categories';

const sportsQuestions: Question[] = [
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/sportsOpener.mp3',
    'true',
    'https://s3.amazonaws.com/audiolab-audio/sportsQ1Correct.mp3',
    'https://s3.amazonaws.com/audiolab-audio/sportsQ1Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/sportsQ2.mp3',
    'true',
    '',
    '',
    QuestionType.MULTIPLECHOICE
  ),
];

const sportsCategory = () => new Category(sportsQuestions);

export { sportsCategory };
