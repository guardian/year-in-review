import { Container } from 'fluent-ssml';
import { Topic } from './rounds';
import { buildSSMLAudioResponse } from '../responses/ssmlResponses';

interface ConversationData {
  finishedWelcomeIntent?: boolean;
  repromptCount?: number;
  currentTopic?: Topic;
  currentQuestion?: number;
  currentRound?: number;
  numberOfQuestionsAnswered?: number;
  score?: number;
}

class Unknown {
  constructor(public error: string) {}
}

enum DialogflowResponseType {
  ASK,
  CLOSE,
}

class DialogflowResponse {
  constructor(
    public responseType: DialogflowResponseType,
    public responseSSML: [Container, Container] | Container,
    public responseText: [string, string] | string,
    public suggestionChips: string[]
  ) {}
}

type OptionString = string | Unknown;

type OptionBoolean = boolean | unknown;

class MultimediaResponse {
  public audio: Container;

  constructor(audio: Container | string, public text: string) {
    if (typeof audio === 'string') {
      this.audio = buildSSMLAudioResponse(audio);
    } else {
      this.audio = audio;
    }
  }
}

export {
  ConversationData,
  Unknown,
  DialogflowResponse,
  DialogflowResponseType,
  OptionString,
  OptionBoolean,
  MultimediaResponse,
};
