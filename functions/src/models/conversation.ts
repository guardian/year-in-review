import { Container } from 'fluent-ssml';
import { Topic } from './rounds';

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

enum ResponseType {
  ASK,
  CLOSE,
}

class Response {
  constructor(
    public responseType: ResponseType,
    public responseSSML: Container,
    public responseText: string
  ) {}
}

type OptionString = string | Unknown;

type OptionBoolean = boolean | unknown;

class EndOfGameFeedback {
  constructor(public audio: Container, public text: string) {}
}

class DoNotPlayFeedback {
  constructor(public audio: Container, public text: string) {}
}

export {
  ConversationData,
  Unknown,
  Response,
  ResponseType,
  OptionString,
  OptionBoolean,
  EndOfGameFeedback,
  DoNotPlayFeedback,
};
