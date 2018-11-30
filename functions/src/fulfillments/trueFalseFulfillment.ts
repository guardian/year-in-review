import { Category, OptionCategory } from '../models/categories';
import {
  ConversationData,
  Response,
  ResponseType,
  Unknown,
} from '../models/models';
import { OptionQuestion, Question, QuestionType } from '../models/questions';
import {
  buildQuestionSSMLAudioResponse,
  buildSSMLAudioResponse,
} from '../responses/genericResponse';

import { Topic } from '../models/rounds';
import { categories } from '../content/categoryContent';
import { unexpectedErrorAudio } from '../content/errorContent';

const trueFalseFulfullment = (
  answer: string,
  data: ConversationData
): Response => {
  const topic: Topic = data.currentTopic || Topic.SPORT;
  const questionNumber: number = data.currentQuestion || 1;
  const category: OptionCategory = categories.getCategory(topic);
  if (category instanceof Category) {
    const question: OptionQuestion = category.getQuestion(questionNumber);
    const nextQuestion: OptionQuestion = category.getQuestion(
      questionNumber + 1
    );
    incrementQuestionNumber(data);
    return buildResponse(question, nextQuestion, answer);
  } else {
    return new Response(
      ResponseType.CLOSE,
      buildSSMLAudioResponse(unexpectedErrorAudio)
    );
  }
};

const incrementQuestionNumber = (data: ConversationData): void => {
  const currentQuestion = data.currentQuestion || 0;
  data.currentQuestion = currentQuestion + 1;
};

const buildResponse = (
  currentQuestion: OptionQuestion,
  nextQuestion: OptionQuestion,
  answer: string
): Response => {
  if (nextQuestion instanceof Unknown) {
    return new Response(
      ResponseType.CLOSE,
      endOfCategory(currentQuestion, answer)
    );
  } else {
    if (currentQuestion instanceof Question) {
      const feedbackAudio = getFeedbackAudio(currentQuestion, answer);
      const nextQuestionAudio = nextQuestion.questionAudio;
      return new Response(
        ResponseType.ASK,
        buildQuestionSSMLAudioResponse(feedbackAudio, nextQuestionAudio)
      );
    } else {
      return new Response(
        ResponseType.CLOSE,
        buildSSMLAudioResponse(unexpectedErrorAudio)
      );
    }
  }
};

const endOfCategory = (question: OptionQuestion, answer: string) => {
  return buildSSMLAudioResponse(
    'End of Category. Next category not implemented yet'
  );
};

const isTrueFalseCorrect = (answer: string, question: Question): boolean => {
  return answer === question.answer;
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

const getFeedbackAudio = (question: Question, answer: string): string => {
  return isCorrectAnswer(answer, question)
    ? question.correctAnswerAudio
    : question.incorrectAnswerAudio;
};

export {
  trueFalseFulfullment,
  isCorrectAnswer,
  buildResponse,
  incrementQuestionNumber,
};
