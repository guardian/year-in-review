import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';

import { RoundCollection } from '../models/rounds';
import { buildSSMLAudioResponse } from './ssmlResponses';
import { gameOver } from '../fulfillments/endOfGameFulfillment';
import { rounds } from '../content/roundContent';
import { startCategory } from '../fulfillments/categoryFulfillment';
import { unexpectedErrorAudio } from '../content/errorContent';

const roundHelperResponse = (
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
    return new Response(ResponseType.CLOSE, gameOver(data));
  }
};

const chooseRoundResponse = (
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

export { roundHelperResponse, chooseRoundResponse };
