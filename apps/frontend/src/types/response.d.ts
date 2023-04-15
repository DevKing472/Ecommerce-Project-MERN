import { Address } from './address';
import { Order } from './order';
import { User } from './user';
import { Product } from './product';
import { SWRHook } from 'swr';

export interface Response {
  success: boolean;
  message?: string;
  order?: Order;
  orders?: Order[];
  address?: Address;
  addresses?: Address[];
  user?: User;
  product?: Product;
  products?: Product[];
}
