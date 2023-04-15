import { Schema, model } from 'mongoose';
import { OrderItem as IOrderItem } from '../@types/common/index.js';

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
});

const OrderItem = model<IOrderItem>('OrderItem', OrderItemSchema);

export { OrderItem };
