import { Container, renderXml, ssml } from 'fluent-ssml';

const buildSSMLAudioResponse = (audio: string): Container => {
  return ssml().audio(audio);
};

const buildSSMLAndCombineAudioResponses = (
  part1: string,
  part2: string
): [Container, Container] => {
  return [ssml().audio(part1), ssml().audio(part2)];
};

const combineSSML = (
  part1: [Container, Container] | Container,
  part2: [Container, Container] | Container
): [Container, Container] => {
  if (part1 instanceof Container && part2 instanceof Container) {
    return [part1, part2];
  }
  if (part1 instanceof Container && part2 instanceof Array) {
    return [part1, joinSSML(part2)];
  }
  if (part1 instanceof Array && part2 instanceof Container) {
    return [joinSSML(part1), part2];
  }
  if (part1 instanceof Array && part2 instanceof Array) {
    return [joinSSML(part1), joinSSML(part2)];
  } else {
    // tslint:disable-next-line:no-console
    console.error(
      `There was an error when trying to combine ${part1} and ${part2}.`
    );
    return [ssml(), ssml()];
  }
};

const joinSSML = (ssmlPair: [Container, Container]): Container => {
  return ssml()
    .append(ssmlPair[0])
    .append(ssmlPair[1]);
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
