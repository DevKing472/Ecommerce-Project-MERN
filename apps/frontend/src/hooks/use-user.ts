import { UserContext } from '@/context';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw Error('User context is null');

  return context;
};
