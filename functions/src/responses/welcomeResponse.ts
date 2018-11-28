import {
  askAgainAudio,
  doNotPlayAudio,
  helpAtStartAudio,
  startYearInReviewAudio,
  welcomeAudio,
} from '../content/welcomeContent';
import { renderXml, ssml } from 'fluent-ssml';

const welcomeResponse = renderXml(
  ssml()
    .audio(welcomeAudio)
    .render()
);

const askAgainResponse = renderXml(
  ssml()
    .audio(askAgainAudio)
    .render()
);

const startYearInReviewResponse = renderXml(
  ssml()
    .audio(startYearInReviewAudio)
    .render()
);

const doNotPlayResponse = renderXml(
  ssml()
    .audio(doNotPlayAudio)
    .render()
);

const helpAtStartResponse = renderXml(
  ssml()
    .audio(helpAtStartAudio)
    .render()
);

export {
  welcomeResponse,
  askAgainResponse,
  startYearInReviewResponse,
  doNotPlayResponse,
  helpAtStartResponse,
};
