import { Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isAnon: boolean;
  createdAt: Date;
  updatedAt: Date;
}
