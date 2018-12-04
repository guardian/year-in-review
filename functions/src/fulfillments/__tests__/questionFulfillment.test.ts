import {
  ConversationData,
  ResponseType,
  Unknown,
} from '../../models/conversation';
import {
  FillInTheBlankQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from '../../models/questions';
import {
  buildFillInTheBlankQuestionResponse,
  buildMultipleChoiceQuestionResponse,
  buildTrueFalseQuestionResponse,
} from '../../responses/questionResponses';
import {
  fillInTheBlankHelp,
  multipleChoiceHelp,
  trueFalseHelp,
} from '../../content/genericQuestionContent';
import {
  fillInTheBlankIncorrectFulfillment,
  fillInTheBlankQuestionFulfillment,
  getQuestionBasedOnConversationData,
  getQuestionSpecificHelpAudio,
  incrementQuestionNumber,
  multipleChoiceQuestionFulfillment,
  questionHelpFulfillment,
  questionRepromptFulfillment,
  trueFalseQuestionFulfillment,
} from '../questionFulfillment';

import { Topic } from '../../models/rounds';
import { buildSSMLAndCombineAudioResponses } from '../../responses/ssmlResponses';
import { fallbackFulfillment } from '../helperFulfillments';
import { unexpectedErrorResponse } from '../../utils/logger';

describe('True False Fulfillment', () => {
  test('If answer cannot be converted to true or false use fallback response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'grapes';
    trueFalseQuestionFulfillment(answer, data);
    expect(fallbackFulfillment).toBeCalled;
  });

  test('If answer can be converted to true build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'true';
    trueFalseQuestionFulfillment(answer, data);
    expect(buildTrueFalseQuestionResponse).toBeCalled;
  });

  test('If answer can be converted to false build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'false';
    trueFalseQuestionFulfillment(answer, data);
    expect(buildTrueFalseQuestionResponse).toBeCalled;
  });
});

describe('Fill in the blank Fulfillment', () => {
  test('If question could not be retrieved expect error response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    fillInTheBlankQuestionFulfillment('', data);
    expect(fallbackFulfillment).toBeCalled;
  });

  test('If question can be retrieved build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    fillInTheBlankQuestionFulfillment('', data);
    expect(buildFillInTheBlankQuestionResponse).toBeCalled;
  });
});

describe('Fill in the blank incorrect answer Fulfillment', () => {
  test('If question could not be retrieved expect error response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    fillInTheBlankIncorrectFulfillment(data);
    expect(fallbackFulfillment).toBeCalled;
  });

  test('If question can be retrieved build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    fillInTheBlankIncorrectFulfillment(data);
    expect(fillInTheBlankIncorrectFulfillment).toBeCalled;
  });
});

describe('Multiple Choice Fulfillment', () => {
  test('If answer cannot be converted to A,B,C or D use fallback response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'grapes';
    multipleChoiceQuestionFulfillment(answer, data);
    expect(fallbackFulfillment).toBeCalled;
  });

  test('If answer can be converted to A build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'A';
    multipleChoiceQuestionFulfillment(answer, data);
    expect(buildMultipleChoiceQuestionResponse).toBeCalled;
  });

  test('If answer can be converted to B build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'B';
    multipleChoiceQuestionFulfillment(answer, data);
    expect(buildMultipleChoiceQuestionResponse).toBeCalled;
  });

  test('If answer can be converted to C build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'C';
    multipleChoiceQuestionFulfillment(answer, data);
    expect(buildMultipleChoiceQuestionResponse).toBeCalled;
  });

  test('If answer can be converted to D build response', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const answer = 'D';
    multipleChoiceQuestionFulfillment(answer, data);
    expect(buildMultipleChoiceQuestionResponse).toBeCalled;
  });
});

describe('Increment Question Number', () => {
  test('If question number is undefined next question number should be 1 as you must currently be asking question 1', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    incrementQuestionNumber(data);
    expect(data).toEqual(expectedData);
  });

  test('If question number is 1 new question number should be 2', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 2,
      currentTopic: Topic.NEWS,
    };
    incrementQuestionNumber(data);
    expect(data).toEqual(expectedData);
  });
});

describe('questionRepromptFulfillment', () => {
  test('If reprompt cannot be fulfilled - no topic return Error Response', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const response = questionRepromptFulfillment(data, '');
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    // tslint:disable-next-line:no-unused-expression
    expect(unexpectedErrorResponse).toBeCalled;
  });

  test('If there is a valid question number and topic return ASK response', () => {
    const data: ConversationData = {
      startRepromptIssued: true,
      currentQuestion: 1,
      currentTopic: Topic.NEWS,
    };
    const response = questionRepromptFulfillment(data, '');
    expect(response.responseType).toEqual(ResponseType.ASK);
    // tslint:disable-next-line:no-unused-expression
    expect(buildSSMLAndCombineAudioResponses).toBeCalled;
  });
});

describe('getQuestionBasedOnConversationData', () => {
  test('If the topic is not on the ConversationData object return Unknown object', () => {
    const data = {
      startRepromptIssued: false,
    };
    const response = getQuestionBasedOnConversationData(data);
    expect(response).toBeInstanceOf(Unknown);
  });
});

describe('questionHelpFulfillment', () => {
  test('If there is a question return question help audio', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
    };
    const response = questionHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.ASK);
    // tslint:disable-next-line:no-unused-expression
    expect(getQuestionSpecificHelpAudio).toBeCalled;
  });

  test('If there is no question available return unexpected Error response and close the conversation', () => {
    const data: ConversationData = { startRepromptIssued: true };
    const response = questionHelpFulfillment(data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
    // tslint:disable-next-line:no-unused-expression
    expect(unexpectedErrorResponse).toBeCalled;
  });
});

describe('getQuestionSpecificHelpAudio', () => {
  test('True false question gets true false audio', () => {
    const question = new TrueFalseQuestion('', true, '', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(trueFalseHelp);
  });

  test('multiple choice question gets multiple choice audio', () => {
    const question = new MultipleChoiceQuestion('', '', '', '', '', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(multipleChoiceHelp);
  });

  test('fill in the blank question gets fill in the blank audio', () => {
    const question = new FillInTheBlankQuestion('', '', '', '');
    const response = getQuestionSpecificHelpAudio(question);
    expect(response).toEqual(fillInTheBlankHelp);
  });
});