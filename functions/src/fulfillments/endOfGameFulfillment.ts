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
  Response,
  ResponseType,
  EndOfGameFeedback,
} from '../models/conversation';

const gameOver = (data: ConversationData): EndOfGameFeedback => {
  const questionsAnswered = data.numberOfQuestionsAnswered || 0;
  const score = data.score || 0;
  const percentScore = calculatePercentScore(questionsAnswered, score);
  if (percentScore > 75) {
    return new EndOfGameFeedback(
      buildSSMLAudioResponse(goodScoreAudio),
      goodScoreText
    );
  }
  if (percentScore < 25) {
    return new EndOfGameFeedback(
      buildSSMLAudioResponse(badScoreAudio),
      badScoreText
    );
  } else {
    return new EndOfGameFeedback(
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
  return new Response(
    ResponseType.CLOSE,
    buildSSMLAudioResponse(quitAudio),
    quitText
  );
};

export { gameOver, quit };
