import { Topic } from '../../models/categories';
import { UserData } from '../../models/models';
import { startRound } from '../categoryFulfillment';

describe('Start Round', () => {
  test('Topic and question number are set correctly if not on userData', () => {
    const topicChoice = 'sport';
    const data: UserData = { startRepromptIssued: false };
    const expectedData: UserData = {
      startRepromptIssued: false,
      currentTopic: Topic.SPORT,
      currentQuestion: 1,
    };
    startRound(topicChoice, data);
    expect(data).toEqual(expectedData);
  });

  test('Topic and question number are updated correctly', () => {
    const topicChoice = 'news';
    const data: UserData = {
      startRepromptIssued: false,
      currentQuestion: 3,
      currentTopic: Topic.SPORT,
    };
    const expectedData: UserData = {
      startRepromptIssued: false,
      currentTopic: Topic.NEWS,
      currentQuestion: 4,
    };
    startRound(topicChoice, data);
    expect(data).toEqual(expectedData);
  });
});
