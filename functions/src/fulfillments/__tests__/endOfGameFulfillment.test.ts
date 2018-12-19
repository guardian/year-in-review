import {
  badScoreAudio,
  goodScoreAudio,
  neutralScoreAudio,
  goodScoreText,
  badScoreText,
  neutralScoreText,
} from '../../content/endOfGameContent';

import {
  ConversationData,
  MultimediaResponse,
} from '../../models/conversation';
import { gameOver } from '../endOfGameFulfillment';
import { buildSSMLAudioResponse } from '../../responses/ssmlResponses';

describe('Scoring at the end of the game', () => {
  test("If score is over 75% get 'good' audio", () => {
    const data: ConversationData = {
      numberOfQuestionsAnswered: 5,
      score: 4,
    };
    const response = gameOver(data);
    const expectedResponse = new MultimediaResponse(
      buildSSMLAudioResponse(goodScoreAudio),
      goodScoreText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If score is less than 25% get 'bad' audio", () => {
    const data: ConversationData = {
      numberOfQuestionsAnswered: 5,
      score: 1,
    };
    const response = gameOver(data);
    const expectedResponse = new MultimediaResponse(
      buildSSMLAudioResponse(badScoreAudio),
      badScoreText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If score is between 25-75% get 'neutral' audio", () => {
    const data: ConversationData = {
      numberOfQuestionsAnswered: 5,
      score: 3,
    };
    const response = gameOver(data);
    const expectedResponse = new MultimediaResponse(
      buildSSMLAudioResponse(neutralScoreAudio),
      neutralScoreText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If no 'numberOfQuestionsAnswered' get 'bad' audio", () => {
    const data: ConversationData = {
      score: 3,
    };
    const response = gameOver(data);
    const expectedResponse = new MultimediaResponse(
      buildSSMLAudioResponse(badScoreAudio),
      badScoreText
    );
    expect(response).toEqual(expectedResponse);
  });

  test("If no 'score' get 'bad' audio", () => {
    const data: ConversationData = {
      numberOfQuestionsAnswered: 5,
    };
    const response = gameOver(data);
    const expectedResponse = new MultimediaResponse(
      buildSSMLAudioResponse(badScoreAudio),
      badScoreText
    );
    expect(response).toEqual(expectedResponse);
  });
});
