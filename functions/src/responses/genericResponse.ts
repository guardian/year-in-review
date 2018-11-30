import { Container, renderXml, ssml } from 'fluent-ssml';

const buildSSMLAudioResponse = (audio: string): Container => {
  return ssml().audio(audio);
};

const buildQuestionSSMLAudioResponse = (
  feedbackAudio: string,
  nextQuestionAudio: string
): Container => {
  return ssml()
    .audio(feedbackAudio)
    .audio(nextQuestionAudio);
};

const convertSSMLContainerToString = (ssmlContainer: Container): string => {
  return renderXml(ssmlContainer.render());
};

export {
  buildSSMLAudioResponse,
  buildQuestionSSMLAudioResponse,
  convertSSMLContainerToString,
};
