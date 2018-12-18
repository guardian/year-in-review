import { Unknown } from './conversation';

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
    public introductionText: string,
    public helpAudio: string,
    public helpText: string,
    public repeatAudio: string,
    public repeatText: string,
    public noInputAudio: string,
    public noInputText: string,
    public fallbackAudio: string,
    public fallbackText: string,
    public suggestionChips: string[],
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
  ARTS = 'arts',
  POLITICS = 'politics',
  TECHNOLOGY = 'technology',
  LUCKYDIP = 'luckydip',
}

type OptionTopic = Topic | Unknown;

export { Topic, Rounds, RoundCollection, OptionRoundCollection, OptionTopic };
