import {
  ConversationData,
  Unknown,
  MultimediaResponse,
} from '../../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from '../../models/questions';
import {
  askNextQuestion,
  buildFillInTheBlankQuestionIncorrectResponse,
  buildFillInTheBlankQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  buildTrueFalseQuestionResponse,
  endOfCategory,
  getMultipleChoiceFeedback,
  getTrueFalseFeedback,
} from '../questionResponses';

import { Topic } from '../../models/rounds';

describe('Build fill in the blank question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'false',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'true'
    );
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new Unknown('error');
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'true'
    );
    expect(endOfCategory).toBeCalled;
  });

  test('If answer is correct increment number of questions asked and score', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'true'
    );
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 1,
      score: 1,
    };
    expect(data).toEqual(expectedData);
  });

  test('If answer is incorrect increment number of questions asked', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'cat'
    );
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('Build fill in the blank incorrect question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'false',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildFillInTheBlankQuestionIncorrectResponse(
      data,
      currentQuestion,
      nextQuestion
    );
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new Unknown('error');
    buildFillInTheBlankQuestionIncorrectResponse(
      data,
      currentQuestion,
      nextQuestion
    );
    expect(endOfCategory).toBeCalled;
  });

  test('Increment number of questions asked', () => {
    const data = {};
    const currentQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildFillInTheBlankQuestionIncorrectResponse(
      data,
      currentQuestion,
      nextQuestion
    );
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('Build true false question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = {};
    const currentQuestion = new TrueFalseQuestion(
      '',
      '',
      false,
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, true);
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = {};
    const currentQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    const nextQuestion = new Unknown('error');
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, true);
    expect(endOfCategory).toBeCalled;
  });

  test('If answer is correct increment number of questions asked and score', () => {
    const data = {
      numberOfQuestionsAnswered: 1,
      score: 1,
    };
    const currentQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    const nextQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, true);
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 2,
      score: 2,
    };
    expect(data).toEqual(expectedData);
  });

  test('If answer is incorrect increment number of questions asked', () => {
    const data = {};
    const currentQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    const nextQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, false);
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('Build multiple choice question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = {};
    const currentQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.A,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new FillInTheBlankQuestion(
      '',
      '',
      'true',
      '',
      '',
      '',
      ''
    );
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.A
    );
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = {};
    const currentQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.C,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new Unknown('error');
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.B
    );
    expect(endOfCategory).toBeCalled;
  });

  test('If answer is correct increment number of questions asked and score', () => {
    const data = {
      numberOfQuestionsAnswered: 1,
    };
    const currentQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.A,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.A
    );
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 2,
      score: 1,
    };
    expect(data).toEqual(expectedData);
  });

  test('If answer is incorrect increment number of questions asked', () => {
    const data = {};
    const currentQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.A,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    const nextQuestion = new TrueFalseQuestion('', '', true, '', '', '', '');
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.C
    );
    const expectedData: ConversationData = {
      numberOfQuestionsAnswered: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('End of category', () => {
  test('Category is removed from ConversationData', () => {
    const data: ConversationData = {
      currentTopic: Topic.NEWS,
    };
    const feedback = new MultimediaResponse('audio', 'text');
    endOfCategory(data, feedback);
    const expectedData: ConversationData = {
      currentRound: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('Feedback for True False Question', () => {
  test("If answers match and the answer is true return 'correct' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      '',
      true,
      'correct',
      'incorrect',
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, true);
    const expectedResponse = new MultimediaResponse(
      question.correctAnswerAudio,
      question.correctAnswerText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If answers match and the answer is false return 'correct' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      '',
      false,
      'correct',
      'incorrect',
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, false);
    const expectedResponse = new MultimediaResponse(
      question.correctAnswerAudio,
      question.correctAnswerText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If answers do not match and the answer is false return 'incorrect' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      '',
      false,
      'correct',
      'incorrect',
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, true);
    const expectedResponse = new MultimediaResponse(
      question.incorrectAnswerAudio,
      question.incorrectAnswerText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If answers do not match and the answer is true return 'incorrect' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      '',
      true,
      'correct',
      'incorrect',
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, false);
    const expectedResponse = new MultimediaResponse(
      question.incorrectAnswerAudio,
      question.incorrectAnswerText
    );
    expect(response).toEqual(expectedResponse);
  });
});

describe('Feedback for Multiple Choice Question', () => {
  test('If answer is A get A Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.A,
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio',
      'AText',
      'BText',
      'CText',
      'DText'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.A);
    const expectedResponse = new MultimediaResponse(
      question.AAudio,
      question.AText
    );
    expect(response).toEqual(expectedResponse);
  });

  test('If answer is B get B Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.B,
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio',
      'AText',
      'BText',
      'CText',
      'DText'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.B);
    const expectedResponse = new MultimediaResponse(
      question.BAudio,
      question.BText
    );
    expect(response).toEqual(expectedResponse);
  });

  test('If answer is C get C Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.C,
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio',
      'AText',
      'BText',
      'CText',
      'DText'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.C);
    const expectedResponse = new MultimediaResponse(
      question.CAudio,
      question.CText
    );
    expect(response).toEqual(expectedResponse);
  });

  test('If answer is D get D Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      MultipleChoice.C,
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio',
      'AText',
      'BText',
      'CText',
      'DText'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.D);
    const expectedResponse = new MultimediaResponse(
      question.DAudio,
      question.DText
    );
    expect(response).toEqual(expectedResponse);
  });
});
