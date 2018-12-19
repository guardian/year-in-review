import {
  FillInTheBlankQuestion,
  MultipleChoice,
  MultipleChoiceQuestion,
  Question,
  TrueFalseQuestion,
} from '../models/questions';

import { Category } from '../models/categories';

const politicsQuestions: Question[] = [
  new FillInTheBlankQuestion(
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1.ogg',
    'But what social security payment system, designed to simplify six different types of benefit payments, was criticised by Alston as being “gratuitously punitive in its effects”, despite being a good idea in principle?',
    'UNIVERSAL CREDIT',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Universal.ogg',
    'That’s right. It’s universal credit. Alston said the government’s ambitious programme to simplify the benefits system was a good idea in principle but was “fast falling into universal discredit” and should be overhauled.\n\nNext, have a listen to Labour MP David Lammy speaking back in April, challenging the government on its management of the Windrush Scandal.',
    'https://storage.googleapis.com/audio-assets/05.1_YiR_Politics_Q1_Not_Universal.ogg',
    'The correct answer is Universal Credit. Alston said the government’s ambitious programme to simplify the benefits system was a good idea in principle but was “fast falling into universal discredit” and should be overhauled.\n\nNext, have a listen to Labour MP David Lammy speaking back in April, challenging the government on its management of the Windrush Scandal.'
  ),
  new MultipleChoiceQuestion(
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2.ogg',
    'In April, who ultimately resigned as a result of the Government’s poor handling of the Windrush scandal?\nA - David Gauke\nB - Esther McVey\nC - Amber Rudd\nD - Sajid Javid',
    MultipleChoice.C,
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2A.ogg',
    'It was in fact C, Amber Rudd, who resigned as Home Secretary over the issue of deportation targets relating to Windrush.\n\nNext question is Brexit of course. Have a listen to pro-European Conservative MP Anna Soubry back in July, giving a speech on how the failure to secure frictionless trade in the Brexit deal would impact jobs.',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2B.ogg',
    'It was in fact C, Amber Rudd, who resigned as Home Secretary over the issue of deportation targets relating to Windrush.\n\nNext question is Brexit of course. Have a listen to pro-European Conservative MP Anna Soubry back in July, giving a speech on how the failure to secure frictionless trade in the Brexit deal would impact jobs.',
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2C.ogg',
    "That's correct! Amber Rudd resigned as Home Secretary over the issue of deportation targets relating to Windrush.\n\nNext question is Brexit of course. Have a listen to pro-European Conservative MP Anna Soubry back in July, giving a speech on how the failure to secure frictionless trade in the Brexit deal would impact jobs.",
    'https://storage.googleapis.com/audio-assets/05.2_YiR_Politics_Q2D.ogg',
    'It was in fact C, Amber Rudd, who resigned as Home Secretary over the issue of deportation targets relating to Windrush.\n\nNext question is Brexit of course. Have a listen to pro-European Conservative MP Anna Soubry back in July, giving a speech on how the failure to secure frictionless trade in the Brexit deal would impact jobs.'
  ),

  new TrueFalseQuestion(
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3.ogg',
    'True or false: Having been a key part of Theresa May’s Chequers plan, the joint document on Britain’s post-Brexit relationship with the EU, includes the term ‘frictionless trade’.',
    false,
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_False.ogg',
    "Correct, it's false. In November, the joint document failed to offer any hope of frictionless trade.\n\nWith the Brexit debate having remained in the headlines for the entirety of 2018, many at this point feel a sense of Brexit fatigue. Yet unfortunately, it appears that a way forward which might bring the country together and heal divisions, remains elusive.\n\nAnd that’s it for the UK politics round. You might be interested to know that these topics, and many more are explored in The Guardian’s Politics Weekly podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Politics Weekly on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.",
    'https://storage.googleapis.com/audio-assets/05.3_YiR_Politics_Q3_True.ogg',
    'I’m afraid you’re wrong. In November, the joint document failed to offer any hope of frictionless trade.\n\nWith the Brexit debate having remained in the headlines for the entirety of 2018, many at this point feel a sense of Brexit fatigue. Yet unfortunately, it appears that a way forward which might bring the country together and heal divisions, remains elusive.\n\nAnd that’s it for the UK politics round. You might be interested to know that these topics, and many more are explored in The Guardian’s Politics Weekly podcast.\n\nIf you want to listen, you can, at anytime, by saying: “Hey Google, play Politics Weekly on Google Podcasts.” Or you can subscribe, where ever you listen to podcasts.'
  ),
];

const politicsAudioOpening =
  'https://storage.googleapis.com/audio-assets/05.0_YiR_Politics.ogg';

const politicsTextOpening =
  'Ok! You chose politics.\n\nHave a listen to Philip Alston, the UN’s rapporteur talking about extreme poverty and human rights.';

const politicsCategory = new Category(
  politicsQuestions,
  politicsAudioOpening,
  politicsTextOpening
);

export { politicsCategory };
