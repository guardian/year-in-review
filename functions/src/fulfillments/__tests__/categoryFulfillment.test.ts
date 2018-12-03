import { ConversationData, ResponseType } from '../../models/models';

import { Topic } from '../../models/rounds';
import { startCategory } from '../categoryFulfillment';

describe('Start Category', () => {
  test('Topic and question number are set correctly if not on ConversationData', () => {
    const topicChoice = 'sport';
    const data: ConversationData = { startRepromptIssued: false };
    const expectedData: ConversationData = {
      startRepromptIssued: false,
      currentTopic: Topic.SPORT,
      currentQuestion: 1,
    };
    startCategory(topicChoice, data);
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
      currentQuestion: 1,
    };
    startCategory(topicChoice, data);
    expect(data).toEqual(expectedData);
  });

  test('If invalid topic return ResponseType of CLOSE', () => {
    const topicChoice = 'cats';
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const response = startCategory(topicChoice, data);
    expect(response.responseType).toEqual(ResponseType.CLOSE);
  });

  test('If valid topic return ResponseType of ASK', () => {
    const topicChoice = 'news';
    const data: ConversationData = {
      startRepromptIssued: false,
    };
    const response = startCategory(topicChoice, data);
    expect(response.responseType).toEqual(ResponseType.ASK);
  });
});
