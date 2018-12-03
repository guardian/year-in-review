import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/conversation';
import { OptionQuestion, Question, QuestionType } from '../models/questions';
import {
  buildSSMLAndCombineAudioResponses,
  buildSSMLAudioResponse,
  combineSSML,
} from '../responses/ssmlResponses';

import { Container } from 'fluent-ssml';
import { chooseRound } from './roundFulfillment';
import { getQuestionBasedOnConversationData } from './questionFulfillment';
import { unexpectedErrorResponse } from '../utils/logger';

const trueFalseFulfullment = (
  answer: string,
  data: ConversationData
): Response => {
  const question: OptionQuestion = getQuestionBasedOnConversationData(data);
  incrementQuestionNumber(data);
  const nextQuestion: OptionQuestion = getQuestionBasedOnConversationData(data);

  return buildResponse(data, question, nextQuestion, answer);
};

const incrementQuestionNumber = (data: ConversationData): void => {
  const currentQuestion = data.currentQuestion || 0;
  data.currentQuestion = currentQuestion + 1;
};

const buildResponse = (
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
  return isCorrectAnswer(answer, question)
    ? question.correctAnswerAudio
    : question.incorrectAnswerAudio;
};

const isCorrectAnswer = (answer: string, question: Question): boolean => {
  switch (question.questionType) {
    case QuestionType.TRUEFALSE:
      return isTrueFalseCorrect(answer, question);
      break;
    case QuestionType.MULTIPLECHOICE:
      return true;
      break;
    case QuestionType.FILLINTHEBLANK:
      return true;
      break;
    default:
      // tslint:disable-next-line:no-console
      console.log('Unexpected question type');
      return false;
  }
};

const isTrueFalseCorrect = (answer: string, question: Question): boolean => {
  return answer === question.answer;
};

export {
  trueFalseFulfullment,
  endOfCategory,
  isCorrectAnswer,
  buildResponse,
  askNextQuestion,
};
