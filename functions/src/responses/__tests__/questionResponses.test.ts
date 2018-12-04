import { ConversationData, Unknown } from '../../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from '../../models/questions';
import {
  askNextQuestion,
  buildFillInTheBlankIncorrectResponse,
  buildFillInTheBlankQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  buildTrueFalseQuestionResponse,
  endOfCategory,
  getMultipleChoiceFeedback,
  getTrueFalseFeedback,
} from '../questionResponses';

import { Category } from '../../models/categories';
import { Topic } from '../../models/rounds';
import { categories } from '../../content/categoryContent';
import { convertSSMLContainerToString } from '../ssmlResponses';

describe('Build fill in the blank question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new FillInTheBlankQuestion('', 'false', '', '');
    const nextQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'true'
    );
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    const nextQuestion = new Unknown('error');
    buildFillInTheBlankQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      'true'
    );
    expect(endOfCategory).toBeCalled;
  });
});

describe('Build fill in the blank incorrect question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new FillInTheBlankQuestion('', 'false', '', '');
    const nextQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    buildFillInTheBlankIncorrectResponse(data, currentQuestion, nextQuestion);
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    const nextQuestion = new Unknown('error');
    buildFillInTheBlankIncorrectResponse(data, currentQuestion, nextQuestion);
    expect(endOfCategory).toBeCalled;
  });
});

describe('Build true false question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new TrueFalseQuestion('', false, '', '');
    const nextQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, true);
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new TrueFalseQuestion('', true, '', '');
    const nextQuestion = new Unknown('error');
    buildTrueFalseQuestionResponse(data, currentQuestion, nextQuestion, true);
    expect(endOfCategory).toBeCalled;
  });
});

describe('Build multiple choice question response', () => {
  test('If there is a current question and a next question askNextQuestion', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new MultipleChoiceQuestion('', '', '', '', '', '');
    const nextQuestion = new FillInTheBlankQuestion('', 'true', '', '');
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.A
    );
    expect(askNextQuestion).toBeCalled;
  });

  test('If there is a current question and no next question call endOfCategory', () => {
    const data = { startRepromptIssued: true };
    const currentQuestion = new MultipleChoiceQuestion('', '', '', '', '', '');
    const nextQuestion = new Unknown('error');
    buildMultipleChoiceQuestionResponse(
      data,
      currentQuestion,
      nextQuestion,
      MultipleChoice.B
    );
    expect(endOfCategory).toBeCalled;
  });
});

describe('End of category', () => {
  test('End of category audio is included', () => {
    const topic = Topic.NEWS;
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: topic,
    };
    const category = categories.getCategory(topic);
    if (category instanceof Category) {
      const response = endOfCategory(data, 'feedbackAudio');
      const ssml = convertSSMLContainerToString(response.responseSSML);
      expect(ssml).toContain(category.teaserAudio);
    }
  });

  test('Category is removed from ConversationData', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentTopic: Topic.NEWS,
    };
    endOfCategory(data, 'feedbackAudio');
    const expectedData: ConversationData = {
      startRepromptIssued: true,
      currentRound: 1,
    };
    expect(data).toEqual(expectedData);
  });
});

describe('Feedback for True False Question', () => {
  test("If answers match and the answer is true return 'correct' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      true,
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, true);
    expect(response).toEqual(question.correctAnswerAudio);
  });

  test("If answers match and the answer is false return 'correct' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      false,
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, false);
    expect(response).toEqual(question.correctAnswerAudio);
  });

  test("If answers do not match and the answer is false return 'incorrect' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      false,
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, true);
    expect(response).toEqual(question.incorrectAnswerAudio);
  });

  test("If answers do not match and the answer is true return 'incorrect' response", () => {
    const question: TrueFalseQuestion = new TrueFalseQuestion(
      '',
      true,
      'correct',
      'incorrect'
    );
    const response = getTrueFalseFeedback(question, false);
    expect(response).toEqual(question.incorrectAnswerAudio);
  });
});

describe('Feedback for Multiple Choice Question', () => {
  test('If answer is A get A Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.A);
    expect(response).toEqual(question.AAudio);
  });

  test('If answer is B get B Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.B);
    expect(response).toEqual(question.BAudio);
  });

  test('If answer is C get C Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.C);
    expect(response).toEqual(question.CAudio);
  });

  test('If answer is D get D Audio', () => {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(
      '',
      '',
      'AAudio',
      'BAudio',
      'CAudio',
      'DAudio'
    );
    const response = getMultipleChoiceFeedback(question, MultipleChoice.D);
    expect(response).toEqual(question.DAudio);
  });
});
