const quitAudio =
  'https://storage.googleapis.com/audio-assets/08.0_They_Quit_A.ogg';

const quitText =
  'Thanks for playing. Play again anytime by saying "Hey Google, talk to Year in Review". Bye for now.';

const buildEndOfGameText = (feedback: string): string => {
  return `Well, that’s it! You’ve come to the end of the Year In Review!\n\n${feedback}\n\nThanks for playing The Guardian’s Year in Review.\n\nIf you’d like to play the other rounds you missed, you can at any time, by saying “Hey Google, talk to Year In Review.\n\nAnd If you enjoyed it, why not tell a friend? Or share some feedback with us at voicelab@theguardian.com.\n\nBye for now!`;
};

const goodScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Good.ogg';

const goodScoreText = buildEndOfGameText(
  'You were brilliant! Congratulations.\n\nKeep it up next year, with The Guardian’s podcasts, or find us online and in print.'
);

const neutralScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Medium.ogg';

const neutralScoreText = buildEndOfGameText(
  'You did alright! Could be better, but could be worse.\n\nNext year go deeper and learn more with The Guardian’s podcasts, or find us online and in print.'
);

const badScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Bad.ogg';

const badScoreText = buildEndOfGameText(
  'Well, you didn’t do great. It seems we caught you on a bad day.\n\nThe good news is you can do better next year by staying informed with The Guardian’s podcasts, or find us online and in print.'
);

export {
  quitAudio,
  quitText,
  goodScoreAudio,
  goodScoreText,
  neutralScoreAudio,
  neutralScoreText,
  badScoreAudio,
  badScoreText,
};
