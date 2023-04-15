import { Product } from '@/types';
import { PropsWithChildren, useEffect, useReducer } from 'react';
import { CartContext } from './cart-context';
import { CartReducer, sumItems } from './cart-reducer';

export function CartProvider({ children }: PropsWithChildren) {
  const initialState = {
    cartItems: [],
    ...sumItems([]),
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      dispatch({
        type: 'INIT',
        payload: JSON.parse(cartStorage),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function addToCart(payload: Product) {
    dispatch({ type: 'ADD_TO_CART', payload });
  }

  function increase(payload: Product) {
    dispatch({ type: 'INCREASE', payload });
  }

  function decrease(payload: Product) {
    dispatch({ type: 'DECREASE', payload });
  }

  function removeFromCart(payload: Product) {
    dispatch({ type: 'REMOVE_ITEM', payload });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR' });
  }

  function handleCheckout() {
    dispatch({ type: 'CHECKOUT' });
  }

  function updatePrices(payload: Product[]) {
    dispatch({ type: 'UPDATE_PRICES', payload });
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        updatePrices,
        ...sumItems(state.cartItems),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
