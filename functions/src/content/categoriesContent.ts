import { Rounds, Topic } from '../models/categories';

import { QuizRound } from '../models/questions';
import { sportsRound } from './sportsRoundContent';

const roundsByTopic: Rounds = {
  sport: sportsRound(),
};

const topicOptions = [
  new Set([Topic.SPORT, Topic.NEWS, Topic.SCIENCE]),
  new Set([Topic.POLITICS, Topic.TECH]),
];

const getRound = (topic: Topic): QuizRound => {
  return roundsByTopic[topic];
};

export { getRound };
