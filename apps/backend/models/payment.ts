import { Schema, model } from 'mongoose';
import { Payment as IPayment } from '../@types/common/index.js';

const PaymentSchema = new Schema<IPayment>({
  transactionID: { type: String, required: true },
  type: { type: String, required: true, enum: ['paypal'] },
});

const Payment = model<IPayment>('Payment', PaymentSchema);

export { Payment };
