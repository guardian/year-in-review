import { renderXml, ssml } from 'fluent-ssml';

import { sportsOpenerAudio } from '../content/sportsRoundContent';

const sportsOpeningResponse = renderXml(
  ssml()
    .audio(sportsOpenerAudio)
    .render()
);

export { sportsOpeningResponse };
