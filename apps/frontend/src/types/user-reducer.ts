import { User } from './user';

export type UserActions =
  | { type: 'INIT'; payload: User }
  | { type: 'LOG_IN'; payload: User }
  | { type: 'LOG_OUT' };
