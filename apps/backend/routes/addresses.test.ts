import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { Address } from '../models/index.js';
import { startMongoMemory, stopMongoMemoryServer } from '../configs/index.js';

let user: request.Response;
const address = {
  street: 'Street',
  city: 'City',
  country: 'Country',
  zip: 12345,
  fullName: 'Full Name',
  email: 'Email@email.com',
  type: 'billing',
};

describe('/addresses', () => {
  beforeAll(async () => {
    await startMongoMemory();
    user = await request(app).post('/auth/register').send({
      username: 'example2',
      email: 'example2@example.com',
      password: '123',
    });
  });

  it('POST anon', async () => {
    const response = await request(app)
      .post('/addresses')
      .send({
        ...address,
      });
    expect(response.body.success).toBeTruthy();
    const addresses = await Address.find().lean().exec();
    expect(addresses.length).toBe(1);
  });

  it('POST authorized', async () => {
    const response = await request(app)
      .post('/addresses')
      .set('Authorization', user.body.token)
      .send({
        ...address,
      });
    expect(response.body.success).toBeTruthy();
  });

  it('GET', async () => {
    const response = await request(app)
      .get('/addresses')
      .set('Authorization', user.body.token);
    expect(response.body.success).toBeTruthy();
    expect(response.body.addresses.length).toBe(0);
  });

  afterAll(async () => {
    await stopMongoMemoryServer();
  });
});
