import { Question, QuestionType } from '../models/questions';

import { Category } from '../models/categories';

const techQuestions: Question[] = [
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/techOpener.mp3',
    'false',
    'https://s3.amazonaws.com/audiolab-audio/techQ1Correct.mp3',
    'https://s3.amazonaws.com/audiolab-audio/techQ1Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
  new Question(
    'https://s3.amazonaws.com/audiolab-audio/techQ2.mp3',
    'true',
    'https://s3.amazonaws.com/audiolab-audio/techQ2Correct.mp3',
    'https://s3.amazonaws.com/audiolab-audio/techQ2Incorrect.mp3',
    QuestionType.TRUEFALSE
  ),
];

const techCategory = () => new Category(techQuestions);

export { techCategory };
