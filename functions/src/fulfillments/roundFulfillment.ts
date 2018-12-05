import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';
import {
  chooseRoundResponse,
  roundHelperResponse,
} from '../responses/roundResponses';

import { RoundCollection } from '../models/rounds';
import { gameOver } from './endOfGameFulfillment';
import { rounds } from '../content/roundContent';

const roundHelpFulfillment = (data: ConversationData): Response => {
  const getHelpAudio = (round: RoundCollection) => round.helpAudio;
  return roundHelperResponse(data, getHelpAudio);
};

const roundRepeatFullfillment = (data: ConversationData): Response => {
  const getRepeatAudio = (round: RoundCollection) => round.repeatAudio;
  return roundHelperResponse(data, getRepeatAudio);
};

const roundNoInputFulfillment = (data: ConversationData): Response => {
  const getNoInputAudio = (round: RoundCollection) => round.noInputAudio;
  return roundHelperResponse(data, getNoInputAudio);
};

const roundFallbackFulfillment = (data: ConversationData): Response => {
  const getFallbackAudio = (round: RoundCollection) => round.fallbackAudio;
  return roundHelperResponse(data, getFallbackAudio);
};

const chooseRound = (data: ConversationData): Response => {
  incrementRoundNumber(data);
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  if (round instanceof RoundCollection) {
    return chooseRoundResponse(round, data);
  } else {
    return new Response(ResponseType.CLOSE, gameOver(data));
  }
};

const incrementRoundNumber = (data: ConversationData) => {
  const currentRound = data.currentRound || 0;
  data.currentRound = currentRound + 1;
};

export {
  chooseRound,
  roundHelpFulfillment,
  roundRepeatFullfillment,
  roundNoInputFulfillment,
  roundFallbackFulfillment,
};
