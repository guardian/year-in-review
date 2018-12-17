import {
  ConversationData,
  DialogflowResponse,
  DialogflowResponseType,
  MultimediaResponse,
} from '../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  OptionQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';
import { buildSSMLAudioResponse, combineSSML } from './ssmlResponses';

import { chooseRound } from '../fulfillments/roundFulfillment';
import { combineTextResponses } from '../responses/textResponses';

const buildFillInTheBlankQuestionResponse = (
  data: ConversationData,
  currentQuestion: FillInTheBlankQuestion,
  nextQuestion: OptionQuestion,
  answer: string
): DialogflowResponse => {
  updateScore(isFillInTheBlankCorrect(currentQuestion, answer), data);
  const feedback: MultimediaResponse = getFillInTheBlankFeedback(
    currentQuestion,
    answer
  );
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedback);
  } else {
    return endOfCategory(data, feedback);
  }
};

const buildTrueFalseQuestionResponse = (
  data: ConversationData,
  currentQuestion: TrueFalseQuestion,
  nextQuestion: OptionQuestion,
  answer: boolean
): DialogflowResponse => {
  updateScore(isTrueFalseCorrect(currentQuestion, answer), data);
  const feedback: MultimediaResponse = getTrueFalseFeedback(
    currentQuestion,
    answer
  );
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedback);
  } else {
    return endOfCategory(data, feedback);
  }
};

const buildMultipleChoiceQuestionResponse = (
  data: ConversationData,
  currentQuestion: MultipleChoiceQuestion,
  nextQuestion: OptionQuestion,
  answer: MultipleChoice
): DialogflowResponse => {
  updateScore(isMultipleChoiceCorrect(currentQuestion, answer), data);
  const feedback: MultimediaResponse = getMultipleChoiceFeedback(
    currentQuestion,
    answer
  );
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedback);
  } else {
    return endOfCategory(data, feedback);
  }
};

const buildFillInTheBlankQuestionIncorrectResponse = (
  data: ConversationData,
  currentQuestion: FillInTheBlankQuestion,
  nextQuestion: OptionQuestion
): DialogflowResponse => {
  updateScore(false, data);
  const feedback: MultimediaResponse = new MultimediaResponse(
    currentQuestion.incorrectAnswerAudio,
    currentQuestion.incorrectAnswerText
  );
  if (nextQuestion instanceof Question) {
    return askNextQuestion(nextQuestion, feedback);
  } else {
    return endOfCategory(data, feedback);
  }
};

const askNextQuestion = (
  nextQuestion: Question,
  feedback: MultimediaResponse
): DialogflowResponse => {
  return new DialogflowResponse(
    DialogflowResponseType.ASK,
    combineSSML(
      feedback.audio,
      buildSSMLAudioResponse(nextQuestion.questionAudio)
    ),
    combineTextResponses(feedback.text, nextQuestion.questionText)
  );
};

const endOfCategory = (
  data: ConversationData,
  feedback: MultimediaResponse
): DialogflowResponse => {
  removeTopicFromConversationData(data);
  const nextRound: DialogflowResponse = chooseRound(data);
  return new DialogflowResponse(
    nextRound.responseType,
    combineSSML(feedback.audio, nextRound.responseSSML),
    combineTextResponses(feedback.text, nextRound.responseText)
  );
};

const removeTopicFromConversationData = (data: ConversationData): void => {
  delete data.currentTopic;
};

const getTrueFalseFeedback = (
  question: TrueFalseQuestion,
  answer: boolean
): MultimediaResponse => {
  return answer === question.answer
    ? new MultimediaResponse(
        question.correctAnswerAudio,
        question.correctAnswerText
      )
    : new MultimediaResponse(
        question.incorrectAnswerAudio,
        question.incorrectAnswerText
      );
};

const getMultipleChoiceFeedback = (
  question: MultipleChoiceQuestion,
  answer: MultipleChoice
): MultimediaResponse => {
  switch (answer) {
    case MultipleChoice.A:
      return new MultimediaResponse(question.AAudio, question.AText);
    case MultipleChoice.B:
      return new MultimediaResponse(question.BAudio, question.BText);
    case MultipleChoice.C:
      return new MultimediaResponse(question.CAudio, question.CText);
    default:
      return new MultimediaResponse(question.DAudio, question.DText);
  }
};

const getFillInTheBlankFeedback = (
  question: FillInTheBlankQuestion,
  answer: string
): MultimediaResponse => {
  return answer === question.answer
    ? new MultimediaResponse(
        question.correctAnswerAudio,
        question.correctAnswerText
      )
    : new MultimediaResponse(
        question.incorrectAnswerAudio,
        question.incorrectAnswerText
      );
};

const isTrueFalseCorrect = (
  question: TrueFalseQuestion,
  answer: boolean
): boolean => {
  return answer === question.answer;
};

const isMultipleChoiceCorrect = (
  question: MultipleChoiceQuestion,
  answer: MultipleChoice
): boolean => {
  return answer === question.answer;
};

const isFillInTheBlankCorrect = (
  question: FillInTheBlankQuestion,
  answer: string
): boolean => {
  return answer === question.answer;
};

const updateScore = (isCorrect: boolean, data: ConversationData): void => {
  const tally = data.numberOfQuestionsAnswered || 0;
  data.numberOfQuestionsAnswered = tally + 1;
  if (isCorrect) {
    const score = data.score || 0;
    data.score = score + 1;
  }
};

export {
  buildTrueFalseQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  askNextQuestion,
  endOfCategory,
  getTrueFalseFeedback,
  getMultipleChoiceFeedback,
  buildFillInTheBlankQuestionResponse,
  buildFillInTheBlankQuestionIncorrectResponse,
};
