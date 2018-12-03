import { Unknown } from './models';

class Rounds {
  constructor(private rounds: RoundCollection[]) {}

  public getRoundCollection(
    roundCollectionNumber: number
  ): OptionRoundCollection {
    if (roundCollectionNumber > this.rounds.length) {
      return new Unknown('out of bounds for round collection');
    } else {
      return this.rounds[roundCollectionNumber - 1];
    }
  }
}

class RoundCollection {
  constructor(
    public introductionAudio: string,
    public helpAudio: string,
    public repeatAudio: string,
    public noInputAudio: string,
    public fallbackAudio: string,
    private topics: Set<Topic>
  ) {}

  public getTopics(): Set<Topic> {
    return this.topics;
  }
}

type OptionRoundCollection = RoundCollection | Unknown;

enum Topic {
  SPORT = 'sport',
  NEWS = 'news',
  SCIENCE = 'science',
  TECH = 'tech',
  POLITICS = 'politics',
}

type OptionTopic = Topic | Unknown;

export { Topic, Rounds, RoundCollection, OptionRoundCollection, OptionTopic };
