import { RoundCollection, Rounds, Topic } from '../models/rounds';

const roundCollections: RoundCollection[] = [
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/00.1_YiR_Global_or_Sport.ogg',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_News_Sport_L.ogg',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_News_Sport_L.ogg',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_News_Sport_L.ogg',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_News_Sport_L.ogg',
    new Set([Topic.SPORT, Topic.NEWS])
  ),
  new RoundCollection(
    'https://storage.googleapis.com/audio-assets/02.5_YiR_Science_or_Art.ogg',
    'https://storage.googleapis.com/audio-assets/03.0_Category_Help_-_Science_Art_A.ogg',
    'https://storage.googleapis.com/audio-assets/03.3_Category_Repeat_-_Science_or_Art_A.ogg',
    'https://storage.googleapis.com/audio-assets/03.1_Category_Time_Out_-_Science_Art_A.ogg',
    'https://storage.googleapis.com/audio-assets/03.2_Category_Unrecognized_-_Science_Art_A.ogg',
    new Set([Topic.SCIENCE, Topic.ARTS])
  ),
];

const rounds: Rounds = new Rounds(roundCollections);

export { rounds };
