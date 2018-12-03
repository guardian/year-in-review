import { buildSSMLAudioResponse } from '../responses/ssmlResponses';
import { endOfGameAudio } from '../content/endOfGameContent';

const gameOver = () => {
  return buildSSMLAudioResponse(endOfGameAudio);
};

export { gameOver };
