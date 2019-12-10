import { Session } from './session';

export interface Timer {
  id: string;
  name: string;
  sessions: Session[];
}
