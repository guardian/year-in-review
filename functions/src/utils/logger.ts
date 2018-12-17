import { Response, ResponseType } from '../models/conversation';

import { buildSSMLAudioResponse } from '../responses/ssmlResponses';
import {
  unexpectedErrorAudio,
  unexpectedErrorText,
} from '../content/errorContent';

const unexpectedErrorResponse = (logMessage: string): Response => {
  // tslint:disable-next-line:no-console
  console.error(logMessage);
  return new Response(
    ResponseType.CLOSE,
    buildSSMLAudioResponse(unexpectedErrorAudio),
    unexpectedErrorText
  );
};

export { unexpectedErrorResponse };
