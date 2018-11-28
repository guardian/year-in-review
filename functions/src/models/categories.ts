import { QuizRound } from './questions';

interface Categories {
  [index: string]: QuizRound;
}

enum Category {
  SPORT = 'sport',
}

export { Category, Categories };
