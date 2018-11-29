import { ConversationData, ResponseType } from '../../models/models';
import { selectCategory, startRound } from '../categoryFulfillment';

import { Topic } from '../../models/categories';

describe('Start Round', () => {
  test('Topic and question number are set correctly if not on ConversationData', () => {
    const topicChoice = 'sport';
    const data: ConversationData = { startRepromptIssued: false };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.SPORT,
      currentQuestion: 1,
    };
    startRound(topicChoice, data);
    expect(data).toEqual(expectedData);
  });

  test('Topic and question number are updated correctly', () => {
    const topicChoice = 'news';
    const data: ConversationData = {
      startRepromptIssued: false,
      currentQuestion: 3,
      currentTopic: Topic.SPORT,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
      currentQuestion: 4,
    };
    startRound(topicChoice, data);
    expect(data).toEqual(expectedData);
  });

  test('If invalid topic return ResponseType of CLOSE', () => {
    const topicChoice = 'cats';
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const response = startRound(topicChoice, data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
  });

  test('If valid topic return ResponseType of ASK', () => {
    const topicChoice = 'news';
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const response = startRound(topicChoice, data);
    expect(response.responseType).toEqual(ResponseType.ASK);
  });
});

describe('Select Category', () => {
  test('If no category set category to 1', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentCategory: 1,
    };
    selectCategory(data);
    expect(data).toEqual(expectedData);
  });

  test('Update category correctly if category exists on ConversationData', () => {
    const data: ConversationData = {
      startRepromptIssued: false,
      currentCategory: 3,
    };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentCategory: 4,
    };
    selectCategory(data);
    expect(data).toEqual(expectedData);
  });
});
