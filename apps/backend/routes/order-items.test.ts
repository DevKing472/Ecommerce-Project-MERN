import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import {
  startMongoMemory,
  stopMongoMemoryServer,
} from '../configs/mongo-memory.js';
import { Product, Order, OrderItem } from '../models/index.js';

const products = [
  {
    name: 'Macbook',
    quantityOnStock: 1,
    createdAt: new Date(),
    price: 100,
    titleImage: 'default',
    updatedAt: new Date(),
  },
  {
    name: 'iPhone',
    quantityOnStock: 15,
    createdAt: new Date(),
    price: 200,
    titleImage: 'default',
    updatedAt: new Date(),
  },
  {
    name: 'iPad',
    quantityOnStock: 10,
    createdAt: new Date(),
    price: 400,
    titleImage: 'default',
    updatedAt: new Date(),
  },
];

describe('/products/:id/add', () => {
  let user: request.Response;

  beforeAll(async () => {
    await startMongoMemory();
    products.forEach(async (product) => {
      await new Product(product).save();
    });
    user = await request(app).post('/auth/register').send({
      username: 'user',
      email: 'user@example.com',
      password: '123',
    });
  });

  afterAll(async () => {
    await stopMongoMemoryServer();
  });

  it('POST authorized', async () => {
    const product = await Product.findOne().exec();
    const response = await request(app)
      .post(`/products/${product?._id.toString()}/add`)
      .set('Authorization', user.body.token);
    expect(response.body.success).toBeTruthy();
    const order = await Order.find({ user: response.body.order.user }).exec();
    expect(order.length).toBe(1);
  });

  it('POST anon', async () => {
    const product = await Product.findOne().lean().exec();
    const response = await request(app).post(
      `/products/${product?._id.toString()}/add`
    );
    expect(response.body.success).toBeTruthy();
    const order = await Order.find({ user: response.body.order.user }).exec();
    expect(order.length).toBe(1);
  });
});

describe('/products/:id/remove', () => {
  let user: request.Response;

  beforeAll(async () => {
    await startMongoMemory();
    products.forEach(async (product) => {
      await new Product(product).save();
    });
    user = await request(app).post('/auth/register').send({
      username: 'user',
      email: 'user@example.com',
      password: '123',
    });
  });

  it('POST authorized', async () => {
    const product = await Product.findOne().exec();
    const addToCart = await request(app)
      .post(`/products/${product?._id.toString()}/add`)
      .set('Authorization', user.body.token);
    expect(addToCart.body.success).toBeTruthy();

    const response = await request(app)
      .post(`/products/${product?._id.toString()}/remove`)
      .set('Authorization', user.body.token);
    expect(response.body.success).toBeTruthy();
    const order = await Order.findOne({
      user: addToCart.body.order.user,
    }).exec();
    const orderItems = await OrderItem.find({ order: order?._id }).exec();
    expect(orderItems.length).toBe(0);
  });

  it('POST anon', async () => {
    const product = await Product.findOne().lean().exec();
    const addToCart = await request(app).post(
      `/products/${product?._id.toString()}/add`
    );
    expect(addToCart.body.success).toBeTruthy();
    const response = await request(app)
      .post(`/products/${product?._id.toString()}/remove`)
      .set('Authorization', addToCart.body.token);
    expect(response.body.success).toBeTruthy();
    const order = await Order.find({ user: addToCart.body.order.user }).exec();
    expect(order.length).toBe(1);
  });
});
