import {
  ConversationData,
  OptionString,
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

import { Category } from '../models/categories';
import { Container } from 'fluent-ssml';
import { categories } from '../content/categoryContent';
import { chooseRound } from '../fulfillments/roundFulfillment';
import { getTopic } from '../fulfillments/questionFulfillment';
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
  const endOfCategoryAudio: Container = getEndOfCategoryAudio(
    data,
    question,
    answer
  );
  const nextRound: Response = chooseRound(data);
  removeTopicFromConversationData(data);
  return new Response(
    nextRound.responseType,
    combineSSML(endOfCategoryAudio, nextRound.responseSSML)
  );
};

const removeTopicFromConversationData = (data: ConversationData): void => {
  delete data.currentTopic;
};

const getEndOfCategoryAudio = (
  data: ConversationData,
  question: Question,
  answer: string
): Container => {
  const feedback = getFeedbackAudio(question, answer);
  const teaser = getTeaserAudioForCategory(data);
  if (teaser instanceof Unknown) {
    return buildSSMLAudioResponse(feedback);
  } else {
    return buildSSMLAndCombineAudioResponses(feedback, teaser);
  }
};

const getTeaserAudioForCategory = (data: ConversationData): OptionString => {
  const topic = getTopic(data);
  if (topic instanceof Unknown) {
    return topic;
  } else {
    const category = categories.getCategory(topic);
    if (category instanceof Category) {
      return category.teaserAudio;
    } else {
      return category;
    }
  }
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
  const a: MultipleChoiceOption = answer.toLocaleUpperCase() as MultipleChoiceOption;
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
