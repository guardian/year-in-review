import {
  badScoreAudio,
  goodScoreAudio,
  neutralScoreAudio,
  quitAudio,
  quitText,
} from '../content/endOfGameContent';
import { buildSSMLAudioResponse } from '../responses/ssmlResponses';

import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';

const gameOver = (data: ConversationData) => {
  const feedbackAudio = getScoreAudio(data);
  return buildSSMLAudioResponse(feedbackAudio);
};

const getScoreAudio = (data: ConversationData) => {
  const questionsAnswered = data.numberOfQuestionsAnswered || 0;
  const score = data.score || 0;
  const percentScore = calculatePercentScore(questionsAnswered, score);
  if (percentScore > 75) {
    return goodScoreAudio;
  }
  if (percentScore < 25) {
    return badScoreAudio;
  } else {
    return neutralScoreAudio;
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
  return new Response(
    ResponseType.CLOSE,
    buildSSMLAudioResponse(quitAudio),
    quitText
  );
};

export { gameOver, quit };
