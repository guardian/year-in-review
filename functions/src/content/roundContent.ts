import { RoundCollection, Rounds, Topic } from '../models/rounds';
import { unexpectedErrorAudio, unexpectedErrorText } from './errorContent';

const roundCollections: RoundCollection[] = [
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/00.1_YiR_Global_or_Sport.ogg',
    'Sport or news',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_News_Sport_L.ogg',
    'Help',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_News_Sport_L.ogg',
    'Repeat',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_News_Sport_L.ogg',
    'Time out',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_News_Sport_L.ogg',
    'Unrecognised',
    new Set([Topic.SPORT, Topic.NEWS])
  ),
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/02.5_YiR_Science_or_Art.ogg',
    'Science or Arts',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_Science_Art_A.ogg',
    'Help',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_Science_or_Art_A.ogg',
    'Repeat',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_Science_Art_A.ogg',
    'Time out',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_Science_Art_A.ogg',
    'Unrecognised',
    new Set([Topic.SCIENCE, Topic.ARTS])
  ),
  // No choice so currently no round selection audio
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/04.4_YiR_Politics_or_Technology.ogg',
    'Politics or Technology?',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_Politics_Tech_A.ogg',
    'Help',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_Politics_Tech_A.ogg',
    'Repeat',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_Politics_Tech_A.ogg',
    'Time out',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_Politics_Tech_A.ogg',
    'Unrecognised',
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
    new Set([Topic.LUCKYDIP])
  ),
];

const rounds: Rounds = new Rounds(roundCollections);

export { rounds };
