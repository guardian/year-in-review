const welcomeAudio =
  'https://storage.googleapis.com/audio-assets/00.0_YiR_Intro.ogg';

const unrecognisedInputWelcomeAudio =
  'https://storage.googleapis.com/audio-assets/01.4_Welcome_New_-_Unrecognized_1st_A.ogg';

const noInputWelcomeAudio = 'https://storage.googleapis.com/audio-assets/01.6_Welcome_New_-_TimeOut_A.ogg'

const startYearInReviewAudio =
  "https://storage.googleapis.com/audio-assets/01.0_Welcome_New_-_Great._Let's_get_started_A.ogg";

const doNotPlayAudio =
  'https://storage.googleapis.com/audio-assets/01.5_Welcome_New_-_Unrecognized_2nd_A.ogg';

const helpWelcomeAudio =
  'https://storage.googleapis.com/audio-assets/01.3_Welcome_New_-_Help_A.ogg';

const repeatWelcomeAudio = 'https://storage.googleapis.com/audio-assets/01.2_Welcome_New_-_Sure_no_problem_A.ogg'

const unsuportedDeviceWelcome = 'Welcome to The Year In Review';

const unsupportedDeviceCard = {
  text:
    'Unfortunately, the Year In Review is not available on this device.Please try again on a smart speaker like Google Home.If you want to listen to any Guardian podcasts in the meantime, just ask for the show by name.For example, "Hey Google, play Today in Focus."',
  button: {
    title: 'Learn More',
    url:
      'https://www.theguardian.com/info/2018/nov/06/guardian-voice-lab-introduction',
  },
  image: {
    url: 'https://storage.googleapis.com/visual-assets/Card_Not_Supported.png',
    altText: 'Image - blue background with text saying The Year in Review',
  },
};

export {
  welcomeAudio,
  unrecognisedInputWelcomeAudio,
  startYearInReviewAudio,
  doNotPlayAudio,
  helpWelcomeAudio,
  unsuportedDeviceWelcome,
  unsupportedDeviceCard,
  repeatWelcomeAudio,
  noInputWelcomeAudio
};
