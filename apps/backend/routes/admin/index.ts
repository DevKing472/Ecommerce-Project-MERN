import { Router } from 'express';
import { AdminProductRouter } from './orders.js';

export const AdminRouter = Router();

AdminRouter.use('/orders', AdminProductRouter);
AdminRouter.use('/products', AdminProductRouter);
