import { Category } from './categories';

interface UserData {
  startRepromptIssued: boolean;
  currentCategory?: Category;
  currentQuestion?: number;
}

export { UserData };
