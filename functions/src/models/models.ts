import { Container } from 'fluent-ssml';
import { Topic } from './rounds';

interface ConversationData {
  startRepromptIssued: boolean;
  currentTopic?: Topic;
  currentQuestion?: number;
  currentRound?: number;
}

class Unknown {
  public error: string;
  constructor(error: string) {
    this.error = error;
  }
}

enum ResponseType {
  ASK,
  CLOSE,
}

class Response {
  public responseType: ResponseType;
  public responseSSML: Container;
  constructor(responseType: ResponseType, responseSSML: Container) {
    this.responseType = responseType;
    this.responseSSML = responseSSML;
  }
}

export { ConversationData, Unknown, Response, ResponseType };
