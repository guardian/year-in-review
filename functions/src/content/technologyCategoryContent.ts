import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const technologyQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1.ogg',
    'True or false: This year Apple became the first company in history to be valued at a trillion dollars.',
    true,
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_True.ogg',
    "It is indeed true! Well done! It means Apple’s stock market value is more than a third the size of the UK economy and larger than the economies of Turkey and Switzerland.\n\nNext question.\n\nIn March, The Observer newspaper reported that Cambridge Analytica had used the personal data harvested from millions of people's Facebook profiles without their consent, in one of the tech giant’s biggest ever data breaches. Listen to this clip from Carole Cadwalladr’s interview with a whistleblower who went public.",
    'https://storage.googleapis.com/audio-assets/06.1_YiR_Technology_q1_False.ogg',
    "Ooof. You’re wrong! It is actually true! In August, Apple did reach a $1trillion dollar valuation. It means Apple’s stock market value is more than a third the size of the UK economy and larger than the economies of Turkey and Switzerland.\n\nNext question.\n\nIn March, The Observer newspaper reported that Cambridge Analytica had used the personal data harvested from millions of people's Facebook profiles without their consent, in one of the tech giant’s biggest ever data breaches. Listen to this clip from Carole Cadwalladr’s interview with a whistleblower who went public."
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2.ogg',
    'The question is, who was that Canadian data scientist turned whistleblower?\nA - Alexander Nix\nB - Christopher Wylie\nC - Shahmir Sanni\nD - Robert Mercer',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2A.ogg',
    'It was B, Christopher Wylie who was the Canadian whistleblower behind the Cambridge Analytica revelations, It was Wylie who, whilst studying for a PhD in fashion trend forecasting, came up with the idea to bring big data and social media to an established military methodology called \'information operations\'.\n\nCambridge Analytica deny any wrongdoing. Amid mounting legal feels and negative coverage, they announced in May that they were "closing and starting insolvency proceedings".So, next clip. Do you remember the slew of emails we all received back in May due to the introduction of an EU law on data protection and privacy?',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2B.ogg',
    'It was B, Christopher Wylie who was the Canadian whistleblower behind the Cambridge Analytica revelations, It was Wylie who, whilst studying for a PhD in fashion trend forecasting, came up with the idea to bring big data and social media to an established military methodology called \'information operations\'.\n\nCambridge Analytica deny any wrongdoing. Amid mounting legal feels and negative coverage, they announced in May that they were "closing and starting insolvency proceedings".\n\nSo, next clip. Do you remember the slew of emails we all received back in May due to the introduction of an EU law on data protection and privacy?',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2C.ogg',
    'It was B, Christopher Wylie who was the Canadian whistleblower behind the Cambridge Analytica revelations, It was Wylie who, whilst studying for a PhD in fashion trend forecasting, came up with the idea to bring big data and social media to an established military methodology called \'information operations\'.\n\nCambridge Analytica deny any wrongdoing. Amid mounting legal feels and negative coverage, they announced in May that they were "closing and starting insolvency proceedings".\n\nSo, next clip. Do you remember the slew of emails we all received back in May due to the introduction of an EU law on data protection and privacy?',
    'https://storage.googleapis.com/audio-assets/06.2_YiR_Technology_q2D.ogg',
    'It was B, Christopher Wylie who was the Canadian whistleblower behind the Cambridge Analytica revelations, It was Wylie who, whilst studying for a PhD in fashion trend forecasting, came up with the idea to bring big data and social media to an established military methodology called \'information operations\'.\n\nCambridge Analytica deny any wrongdoing. Amid mounting legal feels and negative coverage, they announced in May that they were "closing and starting insolvency proceedings".\n\nSo, next clip. Do you remember the slew of emails we all received back in May due to the introduction of an EU law on data protection and privacy?'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3.ogg',
    'What is the abbreviated name for the EU regulation that caused everyone to receive all those concerned emails from businesses?',
    'GDPR',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_GDPR.ogg',
    'That’s correct! GDPR, which stands for General Data Protection Regulation, is an EU law which was seven years in the making, replacing the 1995 Data Protection Directive which, until May, had set the minimum standards for processing data in the EU.\n\nYou might be interested to know that these and other tech topics are explored in our techology podcast, Chips with Everything. You can subscribe, wherever you listen to your podcasts.',
    'https://storage.googleapis.com/audio-assets/06.3_YiR_Technology_q3_Not_GDPR.ogg',
    'Wrong answer! GDPR, which stands for General Data Protection Regulation, is an EU law which was seven years in the making, replacing the 1995 Data Protection Directive which, until May, had set the minimum standards for processing data in the EU.\n\nYou might be interested to know that these and other tech topics are explored in our techology podcast, Chips with Everything. You can subscribe, wherever you listen to your podcasts.'
  ),
];

const technologyAudioOpening =
  'https://storage.googleapis.com/audio-assets/06.0_YiR_Technology.ogg';

const technologyTextOpening =
  'You chose to answer questions on technology.\n\nListen to this clip from Apple CEO Tim Cook’s Keynote speech at their annual September event where they traditionally announce a new range of products.';

const technologyCategory = new Category(
  technologyQuestions,
  technologyAudioOpening,
  technologyTextOpening
);

export { technologyCategory };
