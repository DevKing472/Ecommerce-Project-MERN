import { User } from './user';

export interface Order {
  _id: string;
  user: User;
  isOrdered: boolean;
  payment?: Payment | string;
  addressShipping?: Address | string;
  addressBilling?: Address | string;
  status: 'draft' | 'processing' | 'delivery' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}
