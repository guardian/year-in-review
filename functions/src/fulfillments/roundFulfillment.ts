import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
  MultimediaResponse,
} from '../models/conversation';
import {
  chooseRoundResponse,
  roundHelperResponse,
} from '../responses/roundResponses';

import { RoundCollection } from '../models/rounds';
import { gameOver } from './endOfGameFulfillment';
import { rounds } from '../content/roundContent';

const roundHelpFulfillment = (data: ConversationData): DialogflowResponse => {
  const getHelpFeedback = (round: RoundCollection) =>
    new MultimediaResponse(round.helpAudio, round.helpText);
  return roundHelperResponse(data, getHelpFeedback);
};

const roundRepeatFullfillment = (
  data: ConversationData
): DialogflowResponse => {
  const getRepeatFeedback = (round: RoundCollection) =>
    new MultimediaResponse(round.repeatAudio, round.repeatText);
  return roundHelperResponse(data, getRepeatFeedback);
};

const roundNoInputFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  const getNoInputFeedback = (round: RoundCollection) =>
    new MultimediaResponse(round.noInputAudio, round.noInputText);
  return roundHelperResponse(data, getNoInputFeedback);
};

const roundFallbackFulfillment = (
  data: ConversationData
): DialogflowResponse => {
  const getFallbackFeedback = (round: RoundCollection) =>
    new MultimediaResponse(round.fallbackAudio, round.fallbackText);
  return roundHelperResponse(data, getFallbackFeedback);
};

const chooseRound = (data: ConversationData): DialogflowResponse => {
  incrementRoundNumber(data);
  const roundNumber = data.currentRound || 1;
  const round = rounds.getRoundCollection(roundNumber);
  if (round instanceof RoundCollection) {
    return chooseRoundResponse(round, data);
  } else {
    const feedback = gameOver(data);
    return new DialogflowResponse(
      DialogflowResponseType.CLOSE,
      feedback.audio,
      feedback.text
    );
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
