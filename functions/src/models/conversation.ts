import { Container } from 'fluent-ssml';
import { Topic } from './rounds';

interface ConversationData {
  startRepromptIssued: boolean;
  currentTopic?: Topic;
  currentQuestion?: number;
  currentRound?: number;
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

export { ConversationData, Unknown, Response, ResponseType, OptionString };
