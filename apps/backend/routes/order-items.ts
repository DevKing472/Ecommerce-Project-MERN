import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { OrderItemsController } from '../controllers/index.js';

export const OrderItemsRouter = Router({ mergeParams: true });

OrderItemsRouter.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  OrderItemsController.addToCart
);
OrderItemsRouter.post(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  OrderItemsController.removeFromCart
);
OrderItemsRouter.post(
  '/substract',
  passport.authenticate('jwt', { session: false }),
  OrderItemsController.substractFromCart
);
