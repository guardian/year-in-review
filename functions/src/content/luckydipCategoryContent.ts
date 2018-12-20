import {
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const luckydipQuestions: Question[] = [
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1.ogg',
    'How were at all thirteen members of the team successfully removed from the cave? Was it with the aid of:\nA - Rope and scuba gear\nB - Submarines\nC - Row boats\nD - A newly created passage',
    MultipleChoice.A,
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1A.ogg',
    'Correct. It was indeed rope and scuba gear that was successfully used to rescue the team. Each boy wore a full-face scuba mask, plus a wetsuit, boots and a helmet. Two navy divers accompanied each boy with the lead diver carrying the boy’s air tank, guiding the boy through the cave using a static rope.\n\nOnto the next question.\n\nHave a listen to Julian Assange, in an interview earlier this year explaining his humble motivations behind Wikileaks. Assange has had another interesting year, despite remaining holed up in the Ecuadorian embassy in London, where he’s been since June 2012.',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1B.ogg',
    'Incorrect. It was A, rope and scuba gear. Each boy wore a full-face scuba mask, plus a wetsuit, boots and a helmet. Two navy divers accompanied each boy with the lead diver carrying the boy’s air tank, guiding the boy through the cave using an 8mm static rope.\n\nOnto the next question.\n\nHave a listen to Julian Assange, in an interview earlier this year explaining his humble motivations behind Wikileaks. Assange has had another interesting year, despite remaining holed up in the Ecuadorian embassy in London, where he’s been since June 2012.',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1C.ogg',
    'Incorrect. It was A, rope and scuba gear. Each boy wore a full-face scuba mask, plus a wetsuit, boots and a helmet. Two navy divers accompanied each boy with the lead diver carrying the boy’s air tank, guiding the boy through the cave using an 8mm static rope.\n\nOnto the next question.\n\nHave a listen to Julian Assange, in an interview earlier this year explaining his humble motivations behind Wikileaks. Assange has had another interesting year, despite remaining holed up in the Ecuadorian embassy in London, where he’s been since June 2012.',
    'https://storage.googleapis.com/audio-assets/07.1_YiR_Lucky_Q1D.ogg',
    'Incorrect. It was A, rope and scuba gear. Each boy wore a full-face scuba mask, plus a wetsuit, boots and a helmet. Two navy divers accompanied each boy with the lead diver carrying the boy’s air tank, guiding the boy through the cave using an 8mm static rope.\n\nOnto the next question.\n\nHave a listen to Julian Assange, in an interview earlier this year explaining his humble motivations behind Wikileaks. Assange has had another interesting year, despite remaining holed up in the Ecuadorian embassy in London, where he’s been since June 2012.'
  ),
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2.ogg',
    'True or false: This year Ecuador have established a new set of house rules for Julian Assange, which require him to clean his bathroom and take better care of his cat.',
    true,
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_True.ogg',
    "It is true! Following an escalation in tensions between Assange and his hosts, an October memo implored Assange and his guests to keep the bathroom clean, and to take charge of the “well-being, food, hygiene and proper care” of his pet cat.\n\nAnd on to the final question of the round. Here's a clip from one of The Guardian’s recent Audio Long Reads podcasts, exploring the world of background music, and the role it plays in the music industry and our own lives.",
    'https://storage.googleapis.com/audio-assets/07.2_YiR_Lucky_Q2_False.ogg',
    "I’m afraid you’re wrong. It is true! Following an escalation in tensions between Assange and his hosts, an October memo implored Assange and his guests to keep the bathroom clean, and to take charge of the “well-being, food, hygiene and proper care” of his pet cat.\n\nAnd on to the final question of the round. Here's a clip from one of The Guardian’s recent Audio Long Reads podcasts, exploring the world of background music, and the role it plays in the music industry and our own lives."
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3.ogg',
    'Following the release of a biopic about them earlier this year, what British rock band, was named in December as the most streamed song of the 20th century?\n\nHere’s a clue; the song that earned this band the top spot, first got to number one in 1975, and again in 1991.',
    'QUEEN',
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Queen.ogg',
    "Well done! Yep, that’s right, it was Queen. The band's Bohemian Rhapsody has been named the most streamed song from the 20th century, with 1.6bn streams, overtaking Smells Like Teen Spirit by Nirvana!\n\nYou might be interested to know that the music industry, alongside many other varied and fascinating topics, are explored in our Audio Long Reads podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Guardian Long Reads on Google Podcasts.” Or you can subscribe, wherever you listen to podcasts.",
    'https://storage.googleapis.com/audio-assets/07.3_YiR_Lucky_Q3_Not_Queen.ogg',
    "Nope, the right answer was Queen. The band's Bohemian Rhapsody has been named the most streamed song from the 20th century, with 1.6bn streams, overtaking Smells Like Teen Spirit by Nirvana!\n\nYou might be interested to know that the music industry, alongside many other varied and fascinating topics, are explored in our Audio Long Reads podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Guardian Long Reads on Google Podcasts.” Or you can subscribe, wherever you listen to podcasts."
  ),
];

const luckydipAudioOpening =
  'https://storage.googleapis.com/audio-assets/07.0_YiR_Lucky.ogg';

const luckyDipTextOpening =
  'Well done, you’ve made it to the final round, and it’s a lucky dip, so have a listen to the moment when two British divers found twelve boys and their football coach in Thailand, after they’d gone missing in the Tham Luang cave network.';

const luckydipCategory = new Category(
  luckydipQuestions,
  luckydipAudioOpening,
  luckyDipTextOpening
);

export { luckydipCategory };
