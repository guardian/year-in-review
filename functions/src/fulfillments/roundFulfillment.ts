import { ConversationData, Response, ResponseType } from '../models/models';

import { RoundCollection } from '../models/rounds';
import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { rounds } from '../content/roundContent';
import { startCategory } from './categoryFulfillment';
import { unexpectedErrorAudio } from '../content/errorContent';

const roundHelpFulfillment = (data: ConversationData): Response => {
  const getHelpAudio = (round: RoundCollection) => round.helpAudio;
  return buildSimpleRoundResponse(data, getHelpAudio);
};

const roundRepeatFullfillment = (data: ConversationData): Response => {
  const getRepeatAudio = (round: RoundCollection) => round.repeatAudio;
  return buildSimpleRoundResponse(data, getRepeatAudio);
};

const roundNoInputFulfillment = (data: ConversationData): Response => {
  const getNoInputAudio = (round: RoundCollection) => round.noInputAudio;
  return buildSimpleRoundResponse(data, getNoInputAudio);
};

const roundFallbackFulfillment = (data: ConversationData): Response => {
  const getFallbackAudio = (round: RoundCollection) => round.fallbackAudio;
  return buildSimpleRoundResponse(data, getFallbackAudio);
};

const buildSimpleRoundResponse = (
  data: ConversationData,
  getAudio: (r: RoundCollection) => string
): Response => {
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  if (round instanceof RoundCollection) {
    return new Response(
      ResponseType.ASK,
      buildSSMLAudioResponse(getAudio(round))
    );
  } else {
    return new Response(ResponseType.CLOSE, gameOver());
  }
};

const chooseRound = (data: ConversationData): Response => {
  incrementRoundNumber(data);
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  if (round instanceof RoundCollection) {
    return buildChooseRoundResponse(round, data);
  } else {
    return new Response(ResponseType.CLOSE, gameOver());
  }
};

const buildChooseRoundResponse = (
  round: RoundCollection,
  data: ConversationData
): Response => {
  if (round.getTopics().size === 1) {
    let response: Response = new Response(
      ResponseType.CLOSE,
      buildSSMLAudioResponse(unexpectedErrorAudio)
    );
    round.getTopics().forEach(topic => (response = startCategory(topic, data)));
    return response;
  } else {
    return new Response(
      ResponseType.ASK,
      buildSSMLAudioResponse(round.introductionAudio)
    );
  }
};

const incrementRoundNumber = (data: ConversationData) => {
  const currentRound = data.currentRound || 0;
  data.currentRound = currentRound + 1;
};

const gameOver = () => {
  return 'Game over!';
};

export {
  chooseRound,
  roundHelpFulfillment,
  roundRepeatFullfillment,
  roundNoInputFulfillment,
  roundFallbackFulfillment,
};
