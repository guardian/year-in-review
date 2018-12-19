import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const sportsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1a.ogg',
    'True or false: The appeal was successful, allowing all three players to return to international duty.',
    false,
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_False.ogg',
    'You’re correct! It is indeed false. The Australian Players Union did submit an appeal but it was unsuccessful, dismissed by Cricket Australia.\n\nNext we turn to tennis. Listen to this clip of Serena Williams accusing the umpire of the final of the US Open of sexism. Williams ended up losing the match to 20 year old Naomi Osaka.',
    'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_Q1b_True.ogg',
    'No, it’s false. The Australian Players Union did indeed submit an appeal, but it was unsuccessful and dismissed by Cricket Australia.\n\nNext we turn to tennis. Listen to this clip of Serena Williams during the final of the US Open. Williams ended up losing the match to 20 year old Naomi Osaka.'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/02.2_YiR_Sport_Q2b.ogg',
    'Her victory meant Osaka became the first grand slam singles champion from which country?\nA - Canada\nB - Brazil\nC - Japan\nD - South Korea',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2A.ogg',
    'Nope. In defeating Williams, Naomi Osaka became the first ever Japanese winner of a grand slam singles title.',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2B.ogg',
    'Nope. In defeating Williams, Naomi Osaka became the first ever Japanese winner of a grand slam singles title.',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2C.ogg',
    'Yes! In defeating Williams, Naomi Osaka became the first ever Japanese winner of a grand slam singles title.',
    'https://storage.googleapis.com/audio-assets/02.3_YiR_Sport_2D.ogg',
    'Nope. In defeating Williams, Naomi Osaka became the first ever Japanese winner of a grand slam singles title.'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3.ogg',
    'Ok, final clip in the sports round. Who is that, speaking just after England’s 2-1 defeat to Croatia, in the semi-finals of the world cup?',
    'HARRY KANE',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Kane.ogg',
    'Yes! It was indeed Harry Kane.\n\nIf you’re into sports, or football in particular, you might be interested to know that we have a podcast dedicated to all things football, called Football Weekly.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Football Weekly on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.',
    'https://storage.googleapis.com/audio-assets/02.4_YiR_Sport_Q3_Not_Kane.ogg',
    'It was actually Harry Kane.\n\nIf you’re into sports, or football in particular, you might be interested to know that we have a podcast dedicated to all things football, called Football Weekly.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Football Weekly on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.'
  ),
];

const sportsAudioOpening =
  'https://storage.googleapis.com/audio-assets/02.1_YiR_Sport_a.ogg';

const sportsTextOpening =
  'You chose sport.\n\nListen to an emotional Steve Smith, previously captain of the Australian cricket team.';

const sportsCategory = new Category(
  sportsQuestions,
  sportsAudioOpening,
  sportsTextOpening
);

export { sportsCategory };
