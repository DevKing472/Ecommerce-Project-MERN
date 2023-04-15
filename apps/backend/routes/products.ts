import { Router } from 'express';
import { ProductsController } from '../controllers/index.js';
import { OrderItemsRouter } from './order-items.js';

export const ProductRouter = Router();

ProductRouter.get('/', ProductsController.getAll);
ProductRouter.get('/:id', ProductsController.getById);
ProductRouter.use('/:id', OrderItemsRouter);
