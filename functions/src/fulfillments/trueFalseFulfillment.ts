import {
  Category,
  OptionQuestion,
  Question,
  QuestionType,
  QuizRound,
  Unknown,
  UserData,
} from '../models/models';

import { buildQuestionSSMLAudioResponse } from '../responses/sportsRoundResponse';
import { errorResponse } from '../responses/errorResponse';
import { getRound } from '../content/categoriesContent';

const trueFalseFulfullment = (answer: string, data: UserData) => {
  const category: Category = data.currentCategory || Category.SPORT;
  const questionNumber: number = data.currentQuestion || 0;
  const round: QuizRound = getRound(category);
  const question: OptionQuestion = round.getQuestion(questionNumber);
  const nextQuestion: OptionQuestion = round.getQuestion(questionNumber + 1);
  return buildResponse(question, nextQuestion, answer);
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

export { trueFalseFulfullment, isCorrectAnswer, buildResponse };
