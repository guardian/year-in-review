import { Container } from 'fluent-ssml';
import { Topic } from './rounds';

interface ConversationData {
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

enum ResponseType {
  ASK,
  CLOSE,
}

class Response {
  constructor(
    public responseType: ResponseType,
    public responseSSML: Container
  ) {}
}

type OptionString = string | Unknown;

type OptionBoolean = boolean | unknown;

export {
  ConversationData,
  Unknown,
  Response,
  ResponseType,
  OptionString,
  OptionBoolean,
};
