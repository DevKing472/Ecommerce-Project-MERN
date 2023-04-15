import { Types } from 'mongoose';
import { Order, Product } from './index.js';

export interface OrderItem {
  _id: Types.ObjectId;
  product: Types.ObjectId | Product;
  quantity: number;
  order: Types.ObjectId | Order;
}
