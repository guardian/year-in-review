import {
  badScoreAudio,
  goodScoreAudio,
  neutralScoreAudio,
  quitAudio,
  quitText,
  goodScoreText,
  badScoreText,
  neutralScoreText,
} from '../content/endOfGameContent';
import { buildSSMLAudioResponse } from '../responses/ssmlResponses';

import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
  MultimediaResponse,
} from '../models/conversation';

const gameOver = (data: ConversationData): MultimediaResponse => {
  const questionsAnswered = data.numberOfQuestionsAnswered || 0;
  const score = data.score || 0;
  const percentScore = calculatePercentScore(questionsAnswered, score);
  if (percentScore > 75) {
    return new MultimediaResponse(
      buildSSMLAudioResponse(goodScoreAudio),
      goodScoreText
    );
  }
  if (percentScore < 25) {
    return new MultimediaResponse(
      buildSSMLAudioResponse(badScoreAudio),
      badScoreText
    );
  } else {
    return new MultimediaResponse(
      buildSSMLAudioResponse(neutralScoreAudio),
      neutralScoreText
    );
  }
};

const calculatePercentScore = (
  numberOfQuetionsAnswered: number,
  score: number
) => {
  if (numberOfQuetionsAnswered < 1) {
    return 0;
  } else {
    return Math.round((score / numberOfQuetionsAnswered) * 100);
  }
};

const quit = () => {
  return new DialogflowResponse(
    DialogflowResponseType.CLOSE,
    buildSSMLAudioResponse(quitAudio),
    quitText,
    []
  );
};

export { gameOver, quit };
