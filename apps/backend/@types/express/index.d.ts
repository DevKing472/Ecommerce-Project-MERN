import { HydratedDocument } from 'mongoose';
import { User as IUser } from '../common/index.js';

declare global {
  namespace Express {
    export interface User extends HydratedDocument<IUser> {}
  }
}
