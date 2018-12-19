import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const newsQuestions: Question[] = [
  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1a.ogg',
    'Question one, true or false: It was an MI5 investigation that first presented evidence suggesting the men were in fact Russian military intelligence agents, Anatoliy Chepiga and Alexander Mishkin.',
    false,
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_False.ogg',
    'Yup, It’s false! A website called Bellingcat first named the men and said they are members of the Russian GRU intelligence agency.\n\nOur next question is about Donald Trump who despite not being much of a reader himself, has been great excellent for the publishing industry, with sales up since he came to office.',
    'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_q1b_True.ogg',
    "You got it wrong, I'm afraid. It is in fact false. A website called Bellingcat first named the men and said they are members of the Russian GRU intelligence agency.\n\nOur next question is about Donald Trump who despite not being much of a reader himself, has been great excellent for the publishing industry, with sales up since he came to office."
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2a.ogg',
    'Question two: Despite Trump’s attempts to discredit the author, who wrote the biggest selling White House expose of 2018?\nA - Michael Woolf\nB - Bob Woodward\nC - Omarosa Manigault Newman\nD - James Comey',
    MultipleChoice.B,
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_A.ogg',
    'Nope, that’s wrong. It was B, Bob Woodward’s Fear, that sold the most copies.\n\nListen to this interview with a woman who was allowed to drive in the country of her birth for the first time in her life.',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_B.ogg',
    'Yup, that’s right. It was B, Bob Woodward’s Fear, that sold the most copies.\n\nListen to this interview with a woman who was allowed to drive in the country of her birth for the first time in her life.',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_C.ogg',
    'Nope, that’s wrong. It was B, Bob Woodward’s Fear, that sold the most copies.\n\nListen to this interview with a woman who was allowed to drive in the country of her birth for the first time in her life.',
    'https://storage.googleapis.com/audio-assets/01.2_YiR_Global_q2b_D.ogg',
    'Nope, that’s wrong. It was B, Bob Woodward’s Fear, that sold the most copies.\n\nListen to this interview with a woman who was allowed to drive in the country of her birth for the first time in her life.'
  ),
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3.ogg',
    'The question is, what was the final country in the entire world to allow women to drive?',
    'SAUDI ARABIA',
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3_Saudi.ogg',
    'Yes, you’re right! It was Saudi Arabia who was the final country in the world to allow women to drive.\n\nThat’s it for the global news round. You might be interested to know that these topics and more are explored in our daily podcast Today in Focus.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Today in Focus on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.',
    'https://storage.googleapis.com/audio-assets/01.3_YiR_Global_q3_Not_Saudi.ogg',
    'The answer is Saudi Arabia, which was the final country in the world to allow women to drive.\n\nThat’s it for the global news round. You might be interested to know that these topics and more are explored in our daily podcast Today in Focus.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Today in Focus on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.'
  ),
];

const newsAudioOpening =
  'https://storage.googleapis.com/audio-assets/01.1_YiR_Global_a.ogg';

const newsTextOpening =
  'In March, two men were accused of a Novichok nerve agent attack against former spy Sergei Skripal and his daughter in the town of Salisbury.';

const newsCategory = new Category(
  newsQuestions,
  newsAudioOpening,
  newsTextOpening
);

export { newsCategory };
