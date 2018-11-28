import {
  OptionQuestion,
  Question,
  QuestionType,
  QuizRound,
  Unknown,
} from '../models/questions';

import { Topic } from '../models/categories';
import { UserData } from '../models/models';
import { buildQuestionSSMLAudioResponse } from '../responses/sportsRoundResponse';
import { errorResponse } from '../responses/errorResponse';
import { getRound } from '../content/categoriesContent';

const trueFalseFulfullment = (answer: string, data: UserData) => {
  const topic: Topic = data.currentTopic || Topic.SPORT;
  const questionNumber: number = data.currentQuestion || 1;
  const round: QuizRound = getRound(topic);
  const question: OptionQuestion = round.getQuestion(questionNumber);
  const nextQuestion: OptionQuestion = round.getQuestion(questionNumber + 1);
  incrementQuestionNumber(data);
  return buildResponse(question, nextQuestion, answer);
};

const incrementQuestionNumber = (data: UserData): void => {
  const currentQuestion = data.currentQuestion || 1;
  data.currentQuestion = currentQuestion + 1;
};

const buildResponse = (
  currentQuestion: OptionQuestion,
  nextQuestion: OptionQuestion,
  answer: string
) => {
  if (nextQuestion instanceof Unknown) {
    return endOfRound(currentQuestion, answer);
  } else {
    if (currentQuestion instanceof Question) {
      const feedbackAudio = getFeedbackAudio(currentQuestion, answer);
      const nextQuestionAudio = nextQuestion.questionAudio;
      return buildQuestionSSMLAudioResponse(feedbackAudio, nextQuestionAudio);
    } else {
      return errorResponse;
    }
  }
};

const endOfRound = (question: OptionQuestion, answer: string) => {
  return 'End of Round. Next round not implemented yet';
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
