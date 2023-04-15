import app from '../app.js';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { Order } from '../models/index.js';
import { startMongoMemory } from '../configs/mongo-memory.js';

describe.only('POST', () => {
  let user: request.Response;

  beforeAll(async () => {
    await startMongoMemory();
    user = await request(app).post('/auth/register').send({
      username: 'user',
      email: 'user@example.com',
      password: '123',
    });
  });

  it('Creates new order for authorized', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', user.body.token);
    expect(response.body.success).toBeTruthy();
    const orders = await Order.find().exec();
    expect(orders.length).toBe(1);
  });

  it('Creates new order and user for unauthorized', async () => {
    const response = await request(app).post('/orders');
    expect(response.body.success).toBeTruthy();
    const orders = await Order.find();
    expect(orders.length).toBe(2);
  });
});
