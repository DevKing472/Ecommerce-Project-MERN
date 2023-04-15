import { Schema, model } from 'mongoose';
import { Order as IOrder } from '../@types/common/index.js';

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    isOrdered: { type: Boolean, default: false, required: true },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    addressBilling: { type: Schema.Types.ObjectId, ref: 'Address' },
    addressShipping: { type: Schema.Types.ObjectId, ref: 'Address' },
    status: {
      type: String,
      enum: ['draft', 'processing', 'delivery', 'finished'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>('Order', OrderSchema);

export { Order };
