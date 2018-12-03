import { Container, renderXml, ssml } from 'fluent-ssml';

const buildSSMLAudioResponse = (audio: string): Container => {
  return ssml().audio(audio);
};

const buildSSMLAndCombineAudioResponses = (
  part1: string,
  part2: string
): Container => {
  return ssml()
    .audio(part1)
    .audio(part2);
};

const combineSSML = (part1: Container, part2: Container): Container => {
  return ssml()
    .append(part1)
    .append(part2);
};

const convertSSMLContainerToString = (ssmlContainer: Container): string => {
  return renderXml(ssmlContainer.render());
};

export {
  buildSSMLAudioResponse,
  buildSSMLAndCombineAudioResponses,
  convertSSMLContainerToString,
  combineSSML,
};
