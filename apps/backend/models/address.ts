import { Schema, model } from 'mongoose';
import { Address } from '../@types/common/address.js';

const AddressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
    fullName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['billing', 'shipping'] },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const Address = model('Address', AddressSchema);

export { Address };
