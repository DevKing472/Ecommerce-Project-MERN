import { Cart, Product } from '@/types';
import { createContext } from 'react';

export interface ICartContext extends Cart {
  /**
   * Function to remove an item from the cart
   */
  removeFromCart: (payload: Product) => void;
  /**
   * Function to handle when an item is added from the store into the Cart
   */
  addToCart: (payload: Product) => void;
  /**
   * Function to handle when an item that is in the cart is added again
   */
  increase: (payload: Product) => void;
  /**
   * Function to handle when an item is removed from the cart
   */
  decrease: (payload: Product) => void;
  /**
   * Function to clear the cart
   */
  clearCart: () => void;
  /**
   * Function to handle when the user clicks the checkout button
   */
  handleCheckout: () => void;
  /**
   * Update price of product from fetch request
   */
  updatePrices: (payload: Product[]) => void;
}

export const CartContext = createContext<ICartContext | null>(null);
