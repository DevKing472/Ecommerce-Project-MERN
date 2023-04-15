import { Schema, model } from 'mongoose';
import { Product as IProduct } from '../@types/common/product.js';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantityOnStock: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    deliveryPrice: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    titleImage: { type: String, required: true },
    subImages: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual('totalPrice').get(function () {
  return this.price + (this.deliveryPrice ?? 0) - (this.discount ?? 0);
});

ProductSchema.method('decreaseStock', function (number: number) {
  return this.quantityOnStock - number < 0 ? 0 : this.quantityOnStock - number;
});

const Product = model<IProduct>('Product', ProductSchema);

export { Product };
