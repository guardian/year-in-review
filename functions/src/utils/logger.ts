import { Response, ResponseType } from '../models/conversation';

import { buildSSMLAudioResponse } from '../responses/ssmlResponses';
import { unexpectedErrorAudio } from '../content/errorContent';

const unexpectedErrorResponse = (logMessage: string): Response => {
  // tslint:disable-next-line:no-console
  console.log(logMessage);
  return new Response(
    ResponseType.CLOSE,
    buildSSMLAudioResponse(unexpectedErrorAudio)
  );
};

export { unexpectedErrorResponse };
