import { RoundCollection, Rounds } from '../models/rounds';

import { sportsRound } from './sportsRoundContent';

const roundCollection: RoundCollection = {
  sport: sportsRound(),
  news: sportsRound(),
  science: sportsRound(),
  politics: sportsRound(),
  tech: sportsRound(),
};

const rounds: Rounds = new Rounds(roundCollection);

export { rounds };
