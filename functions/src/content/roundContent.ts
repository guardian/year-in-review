import { RoundCollection, Rounds, Topic } from '../models/rounds';
import { unexpectedErrorAudio, unexpectedErrorText } from './errorContent';

const roundCollections: RoundCollection[] = [
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/00.1_YiR_Global_or_Sport.ogg',
    'Round one, global news or sport?',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_News_Sport_L.ogg',
    'No problem. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Global news or sport?',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_News_Sport_L.ogg',
    'Sure, here are your options again. Global news or sport?',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_News_Sport_L.ogg',
    'Need a second? Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Global news or sport?',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_News_Sport_L.ogg',
    "We didn't catch that. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Global news or sport?",
    ['Global news', 'Sport', 'Repeat'],
    new Set([Topic.SPORT, Topic.NEWS])
  ),
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/02.5_YiR_Science_or_Art.ogg',
    'For round two, do you want to answer questions on science or arts?',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_Science_Art_A.ogg',
    'No problem. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Science or Arts?',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_Science_or_Art_A.ogg',
    'Sure, here are your options again. Science or Arts?',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_Science_Art_A.ogg',
    'Need a second? Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Science or Arts?',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_Science_Art_A.ogg',
    "We didn't catch that. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Science or Arts?",
    ['Science', 'Arts', 'Repeat'],
    new Set([Topic.SCIENCE, Topic.ARTS])
  ),
  // No choice so currently no round selection audio
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/04.4_YiR_Politics_or_Technology.ogg',
    'Do you want to answer questions on politics or technology?',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_Politics_Tech_A.ogg',
    'No problem. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Politics or Technology?',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_Politics_Tech_A.ogg',
    'Sure, here are your options again. Politics or Technology?',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_Politics_Tech_A.ogg',
    'Need a second? Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Politics or Technology?',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_Politics_Tech_A.ogg',
    "We didn't catch that. Pick from any of the categories to hear a round of questions by saying the name of the category. Here are your options again. Politics or Technology?",
    ['Politics', 'Technology', 'Repeat'],
    new Set([Topic.POLITICS, Topic.TECHNOLOGY])
  ),
  // No choice so currently no round selection audio
  new RoundCollection(
    unexpectedErrorAudio,
    unexpectedErrorText,
    unexpectedErrorAudio,
    unexpectedErrorText,
    unexpectedErrorAudio,
    unexpectedErrorText,
    unexpectedErrorAudio,
    unexpectedErrorText,
    unexpectedErrorAudio,
    unexpectedErrorText,
    [],
    new Set([Topic.LUCKYDIP])
  ),
];

const rounds: Rounds = new Rounds(roundCollections);

export { rounds };
