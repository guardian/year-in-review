import { Question, QuestionType } from '../models/questions';

import { Category } from '../models/categories';

const sportsQuestions: Question[] = [
  new Question(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsOpener.mp3',
    'true',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ1Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ1Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
  new Question(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2.mp3',
    'true',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3',
    QuestionType.MULTIPLECHOICE
  ),
  new Question(
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2.mp3',
    'true',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Correct.mp3',
    'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/sportsQ2Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
];

const sportsCategory = () => new Category(sportsQuestions);

export { sportsCategory };
