export interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  quantityOnStock: number;
  price: number;
  deliveryPrice: number;
  discount: number;
  titleImage: string;
  subImages: string[];
  createdAt: Date;
  updatedAt: Date;
  _v: number;
  totalPrice: number;
}
