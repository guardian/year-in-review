import { Topic } from './categories';

interface UserData {
  startRepromptIssued: boolean;
  currentTopic?: Topic;
  currentQuestion?: number;
}

class Unknown {
  public error: string;
  constructor(error: string) {
    this.error = error;
  }
}

export { UserData, Unknown };
