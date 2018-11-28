import { QuizRound } from './questions';

interface Rounds {
  [index: string]: QuizRound;
}

enum Topic {
  SPORT = 'sport',
  NEWS = 'news',
  SCIENCE = 'science',
  TECH = 'tech',
  POLITICS = 'politics',
}

export { Topic, Rounds };
