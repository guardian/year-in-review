import {
  ConversationData,
  Response,
  ResponseType,
} from '../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  OptionQuestion,
  Question,
  TrueFalseQuestion,
  QuestionFeedback,
} from '../models/questions';
import {
  buildSSMLAndCombineAudioResponses,
  buildSSMLAudioResponse,
  combineSSML,
} from './ssmlResponses';

import { chooseRound } from '../fulfillments/roundFulfillment';
import { combineTextResponses } from '../responses/textResponses';

const buildFillInTheBlankQuestionResponse = (
  data: ConversationData,
  currentQuestion: FillInTheBlankQuestion,
  nextQuestion: OptionQuestion,
  answer: string
): Response => {
  updateScore(isFillInTheBlankCorrect(currentQuestion, answer), data);
  const feedback: QuestionFeedback = getFillInTheBlankFeedback(
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
): Response => {
  updateScore(isTrueFalseCorrect(currentQuestion, answer), data);
  const feedback: QuestionFeedback = getTrueFalseFeedback(
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
): Response => {
  updateScore(isMultipleChoiceCorrect(currentQuestion, answer), data);
  const feedback: QuestionFeedback = getMultipleChoiceFeedback(
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
): Response => {
  updateScore(false, data);
  const feedback: QuestionFeedback = new QuestionFeedback(
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
  feedback: QuestionFeedback
): Response => {
  return new Response(
    ResponseType.ASK,
    buildSSMLAndCombineAudioResponses(
      feedback.audio,
      nextQuestion.questionAudio
    ),
    combineTextResponses(feedback.text, nextQuestion.questionText)
  );
};

const endOfCategory = (
  data: ConversationData,
  feedback: QuestionFeedback
): Response => {
  removeTopicFromConversationData(data);
  const nextRound: Response = chooseRound(data);
  return new Response(
    nextRound.responseType,
    combineSSML(buildSSMLAudioResponse(feedback.audio), nextRound.responseSSML),
    combineTextResponses(feedback.text, nextRound.responseText)
  );
};

const removeTopicFromConversationData = (data: ConversationData): void => {
  delete data.currentTopic;
};

const getTrueFalseFeedback = (
  question: TrueFalseQuestion,
  answer: boolean
): QuestionFeedback => {
  return answer === question.answer
    ? new QuestionFeedback(
        question.correctAnswerAudio,
        question.correctAnswerText
      )
    : new QuestionFeedback(
        question.incorrectAnswerAudio,
        question.incorrectAnswerText
      );
};

const getMultipleChoiceFeedback = (
  question: MultipleChoiceQuestion,
  answer: MultipleChoice
): QuestionFeedback => {
  switch (answer) {
    case MultipleChoice.A:
      return new QuestionFeedback(question.AAudio, question.AText);
    case MultipleChoice.B:
      return new QuestionFeedback(question.BAudio, question.BText);
    case MultipleChoice.C:
      return new QuestionFeedback(question.CAudio, question.CText);
    default:
      return new QuestionFeedback(question.DAudio, question.DText);
  }
};

const getFillInTheBlankFeedback = (
  question: FillInTheBlankQuestion,
  answer: string
): QuestionFeedback => {
  return answer === question.answer
    ? new QuestionFeedback(
        question.correctAnswerAudio,
        question.correctAnswerText
      )
    : new QuestionFeedback(
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
