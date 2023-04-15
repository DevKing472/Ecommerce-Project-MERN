import { Types } from 'mongoose';
import { User } from './index.js';

interface Address {
  _id: Types.ObjectId;
  street: string;
  city: string;
  zip: number;
  country: string;
  fullName: string;
  user?: User | Types.ObjectId | undefined;
  type: 'billing' | 'shipping';
  email: string;
}
