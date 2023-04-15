import { User } from '@/types';
import { PropsWithChildren, useEffect, useReducer } from 'react';
import { UserContext } from './user-context';
import { UserReducer } from './user-reducer';

export function UserProvider({ children }: PropsWithChildren) {
  const initialState: User = {
    username: '',
    email: '',
    id: '',
    isAdmin: false,
    isAnon: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      dispatch({ type: 'INIT', payload: JSON.parse(userStorage) });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('user', JSON.stringify(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function login(payload: User) {
    dispatch({ type: 'LOG_IN', payload });
  }

  function logout() {
    dispatch({ type: 'LOG_OUT' });
  }

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
