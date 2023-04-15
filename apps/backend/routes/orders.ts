import { Router } from 'express';
import { passport } from '../configs/index.js';
import { OrdersController } from '../controllers/index.js';

export const OrdersRouter = Router();

OrdersRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  OrdersController.getOrder
);
OrdersRouter.patch(
  '/:id/address',
  passport.authenticate('jwt', { session: false }),
  OrdersController.updateAddress
);
OrdersRouter.patch(
  '/:id/items',
  passport.authenticate('jwt', { session: false }),
  OrdersController.addItems
);
OrdersRouter.patch(
  '/:id/payment',
  passport.authenticate('jwt', { session: false }),
  OrdersController.updatePayment
);
OrdersRouter.patch(
  '/:id/ordered',
  passport.authenticate('jwt', { session: false }),
  OrdersController.changeOrderStatus
);
