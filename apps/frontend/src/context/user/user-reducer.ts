import { UserActions, User } from '@/types';

export function UserReducer(state: User, action: UserActions) {
  const initialState: User = {
    username: '',
    email: '',
    _id: '',
    isAdmin: false,
    isAnon: false,
  };

  switch (action.type) {
    case 'INIT':
      return {
        ...action.payload,
      };

    case 'LOG_IN':
      return {
        ...action.payload,
      };

    case 'LOG_OUT':
      return initialState;

    default:
      return state;
  }
}
