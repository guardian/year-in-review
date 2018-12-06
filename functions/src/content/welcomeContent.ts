const welcomeAudio =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/Welcome.mp3';

const askAgainAudio =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/repeatStart.mp3';

const startYearInReviewAudio =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/startQuiz.mp3';

const doNotPlayAudio =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/doNotPlay.mp3';

const helpAtStartAudio =
  'https://s3.eu-west-2.amazonaws.com/year-in-focus-audio/startHelp.mp3';

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
  askAgainAudio,
  startYearInReviewAudio,
  doNotPlayAudio,
  helpAtStartAudio,
  unsuportedDeviceWelcome,
  unsupportedDeviceCard,
};
