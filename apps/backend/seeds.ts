import { connectToMongo } from './configs/index.js';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { Product } from './models/index.js';
import { Product as IProduct } from './@types/common/product.js';

dotenv.config();

const PRODUCTS: IProduct[] = [];

await connectToMongo(
  typeof process.env.MONGODB_URL === 'string' ? process.env.MONGODB_URL : ''
);

(async () => {
  for (let i = 0; i < 10; ++i) {
    await createRandomProduct();
  }
})();

/**
 * Fake users
 */
async function createRandomProduct() {
  console.log('starting app');
  const product = new Product({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    quantityOnStock: Math.floor(Math.random() * 100),
    price: faker.commerce.price(100, 200),
    deliveryPrice: faker.commerce.price(10, 20),
    discount: faker.commerce.price(0, 50),
    titleImage: faker.image.cats(),
    subImages: [faker.image.cats(), faker.image.cats(), faker.image.cats()],
  });
  PRODUCTS.push(product);
  await product.save();
}
