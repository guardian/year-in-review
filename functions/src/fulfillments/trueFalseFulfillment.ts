import { ConversationData, Unknown } from '../models/models';
import { OptionQuestion, Question, QuestionType } from '../models/questions';
import { OptionRound, Round } from '../models/rounds';
import {
  buildQuestionSSMLAudioResponse,
  buildSSMLAudioResponse,
} from '../responses/genericResponse';

import { Topic } from '../models/categories';
import { roundCollection } from '../content/categoriesContent';
import { unexpectedErrorAudio } from '../content/errorContent';

const trueFalseFulfullment = (answer: string, data: ConversationData) => {
  const topic: Topic = data.currentTopic || Topic.SPORT;
  const questionNumber: number = data.currentQuestion || 1;
  const round: OptionRound = roundCollection.getRound(topic);
  if (round instanceof Round) {
    const question: OptionQuestion = round.getQuestion(questionNumber);
    const nextQuestion: OptionQuestion = round.getQuestion(questionNumber + 1);
    incrementQuestionNumber(data);
    return buildResponse(question, nextQuestion, answer);
  } else {
    return buildSSMLAudioResponse(unexpectedErrorAudio);
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
) => {
  if (nextQuestion instanceof Unknown) {
    return endOfRound(currentQuestion, answer);
  } else {
    if (currentQuestion instanceof Question) {
      const feedbackAudio = getFeedbackAudio(currentQuestion, answer);
      const nextQuestionAudio = nextQuestion.questionAudio;
      return buildQuestionSSMLAudioResponse(feedbackAudio, nextQuestionAudio);
    } else {
      return buildSSMLAudioResponse(unexpectedErrorAudio);
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
