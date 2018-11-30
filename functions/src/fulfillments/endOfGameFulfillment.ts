import { buildSSMLAudioResponse } from '../responses/genericResponse';
import { endOfGameAudio } from '../content/endOfGameContent';

const gameOver = () => {
  return buildSSMLAudioResponse(endOfGameAudio);
};

export { gameOver };
