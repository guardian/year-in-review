import { endOfGameAudio, quitAudio } from '../content/endOfGameContent';

import { buildSSMLAudioResponse } from '../responses/ssmlResponses';

const gameOver = () => {
  return buildSSMLAudioResponse(endOfGameAudio);
};

const quit = () => {
  return buildSSMLAudioResponse(quitAudio);
};

export { gameOver, quit };
