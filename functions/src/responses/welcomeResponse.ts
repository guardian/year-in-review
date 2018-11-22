import {
  askAgainAudioLink,
  leaveYearInReviewAudioLink,
  startYearInReviewAudioLink,
  welcomeAudioLink,
} from '../content/welcomeContent';
import { renderXml, ssml } from 'fluent-ssml';

const welcomeResponse = renderXml(
  ssml()
    .audio(welcomeAudioLink)
    .render()
);

const askAgainResponse = renderXml(
  ssml()
    .audio(askAgainAudioLink)
    .render()
);

const startYearInReviewResponse = renderXml(
  ssml()
    .audio(startYearInReviewAudioLink)
    .render()
);

const leaveYearInReviewResponse = renderXml(
  ssml()
    .audio(leaveYearInReviewAudioLink)
    .render()
);

export {
  welcomeResponse,
  askAgainResponse,
  startYearInReviewResponse,
  leaveYearInReviewResponse,
};
