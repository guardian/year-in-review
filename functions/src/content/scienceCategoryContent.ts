import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const scienceQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1.ogg',
    'How many years does the UN report suggest we have, to limit a climate change catastrophe?\nA - 12\nB - 17\nC - 22\nD - 52',
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_A.ogg',
    'Correct! It’s 12 years. Not long at all!\n\nFollowing a year of devastating hurricanes in the US, record droughts in Cape Town and forest fires in the Arctic as well as in California, world leaders have been told they have a moral obligation to ramp up their action on the climate crisis.',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_B.ogg',
    'Wrong I’m afraid. It’s sooner than that. Just 12 years.\n\nFollowing a year of devastating hurricanes in the US, record droughts in Cape Town and forest fires in the Arctic as well as in California, world leaders have been told they have a moral obligation to ramp up their action on the climate crisis.',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_C.ogg',
    'Wrong I’m afraid. It’s sooner than that. Just 12 years.\n\nFollowing a year of devastating hurricanes in the US, record droughts in Cape Town and forest fires in the Arctic as well as in California, world leaders have been told they have a moral obligation to ramp up their action on the climate crisis.',
    'https://storage.googleapis.com/audio-assets/03.1_YiR_Science_Q1b_D.ogg',
    'Wrong I’m afraid. It’s sooner than that. Just 12 years.\n\nFollowing a year of devastating hurricanes in the US, record droughts in Cape Town and forest fires in the Arctic as well as in California, world leaders have been told they have a moral obligation to ramp up their action on the climate crisis.'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2a.ogg',
    'In November, a chinese researcher controversially announced he altered the DNA of twin girls before birth – without going through the usual scientific channels – raising serious ethical concerns from the scientific community and beyond.\n\nWhat is the common name of the gene editing technology he used?',
    'CRISPR',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_CRISPR.ogg',
    'It is indeed CRISPR. Jiankui He presented his work at a summit in Hong Kong where organizers called his work irresponsible.\n\nCheck this out.\n\nThat’s Tesla owner, Elon Musk smoking a joint during a live podcast recording in September.',
    'https://storage.googleapis.com/audio-assets/03.2_YiR_Science_Q2b_not_CRISPR.ogg',
    'Incorrect! That’s a tough one. The correct answer is CRISPR. Jiankui He presented his work at a summit in Hong Kong where organizers called his work irresponsible.\n\nCheck this out.\n\nThat’s Tesla owner, Elon Musk smoking a joint during a live podcast recording in September.'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3.ogg',
    'True or False: Musk included a $100,000 cherry red Tesla Roadster on the rocket’s cargo. The car is currently traveling through space and headed for Mars.',
    true,
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_True.ogg',
    'Bizarrely it is true.\n\nA cherry red Tesla Roadster was indeed included on the rocket’s cargo, with a dummy test driver called Starman in the driver’s seat, and David Bowie’s Space Oddity playing on the stereo.',
    'https://storage.googleapis.com/audio-assets/03.3_YiR_Science_Q3b_False.ogg',
    'Bizarrely it is true.\n\nA cherry red Tesla Roadster was indeed included on the rocket’s cargo, with a dummy test driver called Starman in the driver’s seat, and David Bowie’s Space Oddity playing on the stereo.'
  ),
];

const scienceAudioOpening =
  'https://storage.googleapis.com/audio-assets/03.0_YiR_Science_a.ogg';

const scienceTextOpening =
  'You chose to answer questions on science.\n\nListen to former Vice President, Al Gore, speaking about the UN Climate Report findings in October.';

const scienceCategory = new Category(
  scienceQuestions,
  scienceAudioOpening,
  scienceTextOpening
);

export { scienceCategory };
