import { Topic } from './categories';

interface UserData {
  startRepromptIssued: boolean;
  currentTopic?: Topic;
  currentQuestion?: number;
}

export { UserData };
