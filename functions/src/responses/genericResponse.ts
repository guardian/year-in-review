import { renderXml, ssml } from 'fluent-ssml';

const buildSSMLAudioResponse = (audio: string) => {
  return renderXml(
    ssml()
      .audio(audio)
      .render()
  );
};

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

export { buildSSMLAudioResponse, buildQuestionSSMLAudioResponse };
