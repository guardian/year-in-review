import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const artsQuestions: Question[] = [
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/04.1_YiR_Arts_Q1.ogg',
    'Can you name the pseudonym under which he releases?',
    'GAMBINO',
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q1_Correct.ogg',
    'Correct! You’re hipper than you look! This Is America has to date, been watched over 440 million times on Youtube.\n\nNext, we’re looking at the art world and the sound of Banksy’s Girl with Balloon getting sold at Sotherby’s in London.',
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q1_Wrong.ogg',
    'Hmm, no quite so down with the kids huh? Well, Donald Glover’s rapper pseudonym is Childish Gambino. This Is America has to date, been watched over 440 million times on Youtube.\n\nNext, we’re looking at the art world and the sound of Banksy’s Girl with Balloon getting sold at Sotherby’s in London.'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/04.2_YiR_Arts_Q2.ogg',
    'True or false: This fee made Banksy the most highly valued living artist ever',
    false,
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q2_False.ogg',
    'Yup it’s false! David Hockney’s Portrait of an Artist (Pool with Two Figures) sold for a staggering $90m at a New York auction.\n\nFinal question in this round is on books.\n\nTake a listen to this clip from The Guardian’s Books Podcast, discussing the announcement of the 2018 Booker Prize winner Anna Burns for her book, Milkman.',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q2_True.ogg',
    'Nope it’s false! David Hockney’s Portrait of an Artist (Pool with Two Figures) sold for a staggering $90m at a New York auction.\n\nFinal question in this round is on books.\n\nTake a listen to this clip from The Guardian’s Books Podcast, discussing the announcement of the 2018 Booker Prize winner, Anna Burns, for her book, Milkman.'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3.ogg',
    'In which country is Milkman set?\nA - England\nB - Scotland\nC - Wales\nD - Northern Ireland',
    MultipleChoice.D,
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3A.ogg',
    'Nope. That’s wrong I’m afraid. Milkman offers an unnerving reminder of recent Northern Irish history.\n\nIf you’re an avid reader, you’ll love The Guardian Books Podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play The Guardian Books Podcast on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3B.ogg',
    'Nope. That’s wrong I’m afraid. Milkman offers an unnerving reminder of recent Northern Irish history.\n\nIf you’re an avid reader, you’ll love The Guardian Books Podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play The Guardian Books Podcast on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3C.ogg',
    'Nope. That’s wrong I’m afraid. Milkman offers an unnerving reminder of recent Northern Irish history.\n\nIf you’re an avid reader, you’ll love The Guardian Books Podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play The Guardian Books Podcast on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.',
    'https://storage.googleapis.com/audio-assets/04.3_YiR_Arts_Q3D.ogg',
    'Correct! Milkman is set in Burns’ native Northern Ireland.\n\nIf you’re an avid reader, you’ll love The Guardian Books Podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play The Guardian Books Podcast on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.'
  ),
];

const artsAudioOpening =
  'https://storage.googleapis.com/audio-assets/04.0_YiR_Arts_a.ogg';

const artsTextOpening =
  'You chose arts.\n\nOur first clip features Donald Glover, refusing to explain the meaning behind his phenomenally successful song and video This Is America, which appeared online and went viral in May.';

const artsCategory = new Category(
  artsQuestions,
  artsAudioOpening,
  artsTextOpening
);

export { artsCategory };
