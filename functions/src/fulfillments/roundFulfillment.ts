import { ConversationData, Response, ResponseType } from '../models/models';

import { RoundCollection } from '../models/rounds';
import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { rounds } from '../content/roundContent';

const selectRound = (data: ConversationData): Response => {
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  incrementRoundNumber(data);
  if (round instanceof RoundCollection) {
    return new Response(
      ResponseType.ASK,
      buildSSMLAudioResponse(round.introductionAudio)
    );
  } else {
    return new Response(ResponseType.CLOSE, gameOver());
  }
};

const incrementRoundNumber = (data: ConversationData) => {
  const currentRound = data.currentRound || 0;
  data.currentRound = currentRound + 1;
};

const gameOver = () => {
  return 'Game over!';
};

export { selectRound };
