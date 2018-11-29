import { Topic } from './categories';

interface ConversationData {
  startRepromptIssued: boolean;
  currentTopic?: Topic;
  currentQuestion?: number;
  currentCategory?: number;
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
  public responseSSML: string;
  constructor(responseType: ResponseType, responseSSML: string) {
    this.responseType = responseType;
    this.responseSSML = responseSSML;
  }
}

export { ConversationData, Unknown, Response, ResponseType };
