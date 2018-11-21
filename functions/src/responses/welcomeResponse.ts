import { renderXml, ssml } from 'fluent-ssml';

import { welcomeAudioLink } from '../content/welcomeContent';
const welcomeResponse = renderXml(
  ssml()
    .audio(welcomeAudioLink)
    .render()
);

export { welcomeResponse };
