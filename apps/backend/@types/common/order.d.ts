import { Types } from 'mongoose';
import { Address, Payment, User } from './index.js';

export interface Order {
  user: Types.ObjectId | User;
  isOrdered: boolean;
  payment?: Types.ObjectId | Payment;
  addressShipping?: Types.ObjectId | Address;
  addressBilling?: Types.ObjectId | Address;
  status: 'draft' | 'processing' | 'delivery' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}
