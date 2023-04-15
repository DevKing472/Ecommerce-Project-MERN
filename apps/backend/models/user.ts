import { Schema, model } from 'mongoose';
import { User as IUser } from '../@types/common/user.js';

const UserSchema = new Schema<IUser>(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isAnon: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', UserSchema);

export { User as User };
