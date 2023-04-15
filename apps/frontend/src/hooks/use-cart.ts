import { CartContext } from '@/context';
import { useContext } from 'react';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw Error('Cart context is null');

  return context;
};
