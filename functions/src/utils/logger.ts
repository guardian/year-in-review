import {
  DialogflowResponse,
  DialogflowResponseType,
} from '../models/conversation';

import { buildSSMLAudioResponse } from '../responses/ssmlResponses';
import {
  unexpectedErrorAudio,
  unexpectedErrorText,
} from '../content/errorContent';

const unexpectedErrorResponse = (logMessage: string): DialogflowResponse => {
  // tslint:disable-next-line:no-console
  console.error(logMessage);
  return new DialogflowResponse(
    DialogflowResponseType.CLOSE,
    buildSSMLAudioResponse(unexpectedErrorAudio),
    unexpectedErrorText,
    []
  );
};

export { unexpectedErrorResponse };
