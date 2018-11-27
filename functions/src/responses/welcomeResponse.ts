import {
  askAgainAudioLink,
  doNotPlayAudioLink,
  helpAtStartAudioLink,
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

const doNotPlayResponse = renderXml(
  ssml()
    .audio(doNotPlayAudioLink)
    .render()
);

const helpAtStartResponse = renderXml(
  ssml()
    .audio(helpAtStartAudioLink)
    .render()
);

export {
  welcomeResponse,
  askAgainResponse,
  startYearInReviewResponse,
  doNotPlayResponse,
  helpAtStartResponse,
};
