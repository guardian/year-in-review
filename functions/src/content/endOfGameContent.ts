const quitAudio =
  'https://storage.googleapis.com/audio-assets/08.0_They_Quit_A.ogg';

const quitText =
  'Thanks for playing. Play again anytime by saying "hey Google, talk to the year in review". Bye for now.';

const buildEndOfGameText = (feedback: string): string => {
  return `Well, that’s it! You’ve come to the end of the Year In Review!\n\n${feedback}\n\nThanks for playing The Guardian’s Year in review.\n\nIf you’d like to play the other rounds you missed, you can at any time, by saying “Hey Google, talk to Year In Review.\n\nAnd If you enjoyed it, why not tell a friend? Or share some feedback with us at voicelab@guardian.co.uk.\n\nBye for now!`;
};

const goodScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Good.ogg';

const goodScoreText = buildEndOfGameText(
  'How did you do? Well, if I’m honest, you were brilliant! You have one hell of a beautiful mind. Congratulations.\n\nKeep it up next year, with the Guardian’s podcasts, or find us online and in print.'
);

const neutralScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Medium.ogg';

const neutralScoreText = buildEndOfGameText(
  'How did you do? You did quite well. And when I say quite well, I’m being kind. I really mean you were average. I suppose most us are though, aren’t we? It’s the painful truth of the bell curve!\n\nWe have an easy fix for next year: go deeper and learn more with the Guardian’s podcasts, or find us online and in print.'
);

const badScoreAudio =
  'https://storage.googleapis.com/audio-assets/08.00_YiR_Score_Bad.ogg';

const badScoreText = buildEndOfGameText(
  'How did you do? Well, If we’re honest, you didn’t do great. Actually, we’re being polite. Let’s just say, we were expecting more and we’re a little disappointed. It seems we caught you on a bad day, and we’ve all had those, so let’s just leave it at that.\n\nThe good news is you can do better next year, by staying informed with the Guardian’s podcasts, or find us online and in print.'
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
