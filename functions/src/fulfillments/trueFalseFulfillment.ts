import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/models';
import { OptionQuestion, Question, QuestionType } from '../models/questions';
import { OptionTopic, Topic } from '../models/rounds';
import {
  buildQuestionSSMLAudioResponse,
  buildSSMLAudioResponse,
  combineSSML,
} from '../responses/genericResponse';

import { Container } from 'fluent-ssml';
import { categories } from '../content/categoryContent';
import { chooseRound } from './roundFulfillment';
import { unexpectedErrorResponse } from '../utils/logger';

const trueFalseFulfullment = (
  answer: string,
  data: ConversationData
): Response => {
  const topic: OptionTopic = getTopic(data);
  if (topic instanceof Unknown) {
    return unexpectedErrorResponse('Topic not found on Conversation Data');
  } else {
    return getResponse(data, topic, answer);
  }
};

const getTopic = (data: ConversationData): OptionTopic => {
  if (typeof data.currentTopic === 'undefined') {
    return new Unknown('No topic found');
  } else {
    return data.currentTopic;
  }
};

const getResponse = (
  data: ConversationData,
  topic: Topic,
  answer: string
): Response => {
  const questionNumber: number = data.currentQuestion || 1;
  const category: OptionCategory = categories.getCategory(topic);
  if (category instanceof Category) {
    const question: OptionQuestion = category.getQuestion(questionNumber);
    const nextQuestion: OptionQuestion = category.getQuestion(
      questionNumber + 1
    );
    incrementQuestionNumber(data);
    return buildResponse(data, question, nextQuestion, answer);
  } else {
    return unexpectedErrorResponse(
      `No category defined for the topic ${topic}`
    );
  }
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
    `Unable to build response for current question ${currentQuestion}, next question ${nextQuestion}`
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
    buildQuestionSSMLAudioResponse(feedbackAudio, nextQuestionAudio)
  );
};

const endOfCategory = (
  data: ConversationData,
  question: Question,
  answer: string
): Response => {
  const feedbackAudio: Container = buildSSMLAudioResponse(
    getFeedbackAudio(question, answer)
  );
  const nextRound: Response = chooseRound(data);
  return new Response(
    nextRound.responseType,
    combineSSML(feedbackAudio, nextRound.responseSSML)
  );
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
  getResponse,
  isCorrectAnswer,
  buildResponse,
  askNextQuestion,
};
