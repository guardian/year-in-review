import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
  MultimediaResponse,
} from '../models/conversation';

import { RoundCollection } from '../models/rounds';
import { buildSSMLAudioResponse } from './ssmlResponses';
import { gameOver } from '../fulfillments/endOfGameFulfillment';
import { rounds } from '../content/roundContent';
import { startCategory } from '../fulfillments/categoryFulfillment';
import {
  unexpectedErrorAudio,
  unexpectedErrorText,
} from '../content/errorContent';

const roundHelperResponse = (
  data: ConversationData,
  getFeedback: (r: RoundCollection) => MultimediaResponse
): DialogflowResponse => {
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  if (round instanceof RoundCollection) {
    const roundFeedback = getFeedback(round);
    return new DialogflowResponse(
      DialogflowResponseType.ASK,
      roundFeedback.audio,
      roundFeedback.text,
      round.suggestionChips
    );
  } else {
    const feedback = gameOver(data);
    return new DialogflowResponse(
      DialogflowResponseType.CLOSE,
      feedback.audio,
      feedback.text,
      []
    );
  }
};

const chooseRoundResponse = (
  round: RoundCollection,
  data: ConversationData
): DialogflowResponse => {
  if (round.getTopics().size === 1) {
    let response: DialogflowResponse = new DialogflowResponse(
      DialogflowResponseType.CLOSE,
      buildSSMLAudioResponse(unexpectedErrorAudio),
      unexpectedErrorText,
      []
    );
    round.getTopics().forEach(topic => (response = startCategory(topic, data)));
    return response;
  } else {
    return new DialogflowResponse(
      DialogflowResponseType.ASK,
      buildSSMLAudioResponse(round.introductionAudio),
      round.introductionText,
      round.suggestionChips
    );
  }
};

export { roundHelperResponse, chooseRoundResponse };
