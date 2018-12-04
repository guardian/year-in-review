import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/conversation';
import {
  MultipleChoiceOption,
  MultipleChoiceQuestion,
  OptionQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';
import {
  buildSSMLAndCombineAudioResponses,
  buildSSMLAudioResponse,
  combineSSML,
} from './ssmlResponses';

import { Container } from 'fluent-ssml';
import { chooseRound } from '../fulfillments/roundFulfillment';
import { unexpectedErrorResponse } from '../utils/logger';

const buildQuestionResponse = (
  data: ConversationData,
  currentQuestion: OptionQuestion,
  nextQuestion: OptionQuestion,
  answer: string
): Response => {
  if (currentQuestion instanceof Question && nextQuestion instanceof Question) {
    return askNextQuestion(currentQuestion, nextQuestion, answer);
  }
  if (currentQuestion instanceof Question && nextQuestion instanceof Unknown) {
    return endOfCategory(data, currentQuestion, answer);
  }
  return unexpectedErrorResponse(
    `Unable to build response for current question ${currentQuestion}, next question ${nextQuestion} using conversation data ${data}.`
  );
};

const askNextQuestion = (
  currentQuestion: Question,
  nextQuestion: Question,
  answer: string
): Response => {
  const feedbackAudio = getFeedbackAudio(currentQuestion, answer);
  const nextQuestionAudio = nextQuestion.questionAudio;
  return new Response(
    ResponseType.ASK,
    buildSSMLAndCombineAudioResponses(feedbackAudio, nextQuestionAudio)
  );
};

const endOfCategory = (
  data: ConversationData,
  question: Question,
  answer: string
): Response => {
  removeTopicFromConversationData(data);
  const feedbackAudio: Container = buildSSMLAudioResponse(
    getFeedbackAudio(question, answer)
  );
  const nextRound: Response = chooseRound(data);
  return new Response(
    nextRound.responseType,
    combineSSML(feedbackAudio, nextRound.responseSSML)
  );
};

const removeTopicFromConversationData = (data: ConversationData): void => {
  delete data.currentTopic;
};

const getFeedbackAudio = (question: Question, answer: string): string => {
  if (question instanceof TrueFalseQuestion) {
    return getTrueFalseFeedback(question, answer);
  }
  if (question instanceof MultipleChoiceQuestion) {
    return getMultipleChoiceFeedback(question, answer);
  } else {
    // tslint:disable-next-line:no-console
    console.log('Unexpected question type');
    return '';
  }
};

const getTrueFalseFeedback = (
  question: TrueFalseQuestion,
  answer: string
): string => {
  if (
    (answer.toLowerCase() === 'false' && !question.answer) ||
    (answer.toLowerCase() === 'true' && question.answer)
  ) {
    return question.correctAnswerAudio;
  } else {
    return question.incorrectAnswerAudio;
  }
};

const getMultipleChoiceFeedback = (
  question: MultipleChoiceQuestion,
  answer: string
): string => {
  const a: MultipleChoiceOption = answer as MultipleChoiceOption;
  switch (a) {
    case MultipleChoiceOption.A:
      return question.AAudio;
    case MultipleChoiceOption.B:
      return question.BAudio;
    case MultipleChoiceOption.C:
      return question.CAudio;
    default:
      return question.DAudio;
  }
};

export {
  buildQuestionResponse,
  askNextQuestion,
  endOfCategory,
  getTrueFalseFeedback,
  getMultipleChoiceFeedback,
};
