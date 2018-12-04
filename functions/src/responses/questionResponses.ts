import {
  ConversationData,
  OptionString,
  Response,
  ResponseType,
  Unknown,
} from '../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
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

const buildFillInTheBlankQuestionResponse = (
  data: ConversationData,
  currentQuestion: FillInTheBlankQuestion,
  nextQuestion: OptionQuestion,
  answer: string
): Response => {
  const feedbackAudio = getFillInTheBlankFeedback(currentQuestion, answer);
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedbackAudio);
  } else {
    return endOfCategory(data, feedbackAudio);
  }
};

const buildTrueFalseQuestionResponse = (
  data: ConversationData,
  currentQuestion: TrueFalseQuestion,
  nextQuestion: OptionQuestion,
  answer: boolean
): Response => {
  const feedbackAudio = getTrueFalseFeedback(currentQuestion, answer);
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedbackAudio);
  } else {
    return endOfCategory(data, feedbackAudio);
  }
};

const buildMultipleChoiceQuestionResponse = (
  data: ConversationData,
  currentQuestion: MultipleChoiceQuestion,
  nextQuestion: OptionQuestion,
  answer: MultipleChoice
): Response => {
  const feedbackAudio = getMultipleChoiceFeedback(currentQuestion, answer);
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedbackAudio);
  } else {
    return endOfCategory(data, feedbackAudio);
  }
};

const buildFillInTheBlankIncorrectResponse = (
  data: ConversationData,
  currentQuestion: FillInTheBlankQuestion,
  nextQuestion: OptionQuestion
) => {
  const feedbackAudio = currentQuestion.incorrectAnswerAudio;
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedbackAudio);
  } else {
    return endOfCategory(data, feedbackAudio);
  }
};

const askNextQuestion = (
  nextQuestion: Question,
  feedbackAudio: string
): Response => {
  const nextQuestionAudio = nextQuestion.questionAudio;
  return new Response(
    ResponseType.ASK,
    buildSSMLAndCombineAudioResponses(feedbackAudio, nextQuestionAudio)
  );
};

const endOfCategory = (
  data: ConversationData,
  feedbackAudio: string
): Response => {
  const endOfCategoryAudio: Container = getEndOfCategoryAudio(
    data,
    feedbackAudio
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
  feedbackAudio: string
): Container => {
  const teaser = getTeaserAudioForCategory(data);
  if (teaser instanceof Unknown) {
    return buildSSMLAudioResponse(feedbackAudio);
  } else {
    return buildSSMLAndCombineAudioResponses(feedbackAudio, teaser);
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

const getTrueFalseFeedback = (
  question: TrueFalseQuestion,
  answer: boolean
): string => {
  return answer === question.answer
    ? question.correctAnswerAudio
    : question.incorrectAnswerAudio;
};

const getMultipleChoiceFeedback = (
  question: MultipleChoiceQuestion,
  answer: MultipleChoice
): string => {
  switch (answer) {
    case MultipleChoice.A:
      return question.AAudio;
    case MultipleChoice.B:
      return question.BAudio;
    case MultipleChoice.C:
      return question.CAudio;
    default:
      return question.DAudio;
  }
};

const getFillInTheBlankFeedback = (
  question: FillInTheBlankQuestion,
  answer: string
) => {
  return answer === question.answer
    ? question.correctAnswerAudio
    : question.incorrectAnswerAudio;
};

export {
  buildTrueFalseQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  askNextQuestion,
  endOfCategory,
  getTrueFalseFeedback,
  getMultipleChoiceFeedback,
  buildFillInTheBlankQuestionResponse,
  buildFillInTheBlankIncorrectResponse,
};
