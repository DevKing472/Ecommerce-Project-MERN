import { Cart } from './cart';

export type CartActions =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'INIT'; payload: Cart }
  | { type: 'REMOVE_ITEM'; payload: Product }
  | { type: 'DECREASE'; payload: Product }
  | { type: 'INCREASE'; payload: Product }
  | { type: 'UPDATE_PRICES'; payload: Product }
  | { type: 'CLEAR' }
  | { type: 'CHECKOUT' };
