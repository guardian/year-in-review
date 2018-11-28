import { renderXml, ssml } from 'fluent-ssml';

import { sportsOpenerAudio } from '../content/sportsRoundContent';

const sportsOpeningResponse = renderXml(
  ssml()
    .audio(sportsOpenerAudio)
    .render()
);

const buildQuestionSSMLAudioResponse = (
  feedbackAudio: string,
  nextQuestionAudio: string
) => {
  return renderXml(
    ssml()
      .audio(feedbackAudio)
      .audio(nextQuestionAudio)
      .render()
  );
};

export { sportsOpeningResponse, buildQuestionSSMLAudioResponse };
