import { Product } from './product';

export interface Cart {
  cartItems: CartItem[];
  totalCart: number;
  totalItems: number;
  totalDiscounts: number;
  totalShippings: number;
  itemCount: number;
}

export interface CartItem extends Partial<Product> {
  id: string;
  quantity: number;
  price: number;
  shippingCost: number;
  discount: number;
  totalPrice: number;
}
