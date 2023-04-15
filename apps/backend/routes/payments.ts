import { Router } from 'express';
import { passport } from '../configs/index.js';
import { PaymentsController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/index.js';

export const PaymentsRouter = Router();

PaymentsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  PaymentsController.getAllPayments
);
PaymentsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.createNewPayment
);
PaymentsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.getPaymentById
);
PaymentsRouter.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.getPaymentByIdAndAddToOrder
);
PaymentsRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.updatePaymentById
);
PaymentsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  PaymentsController.deletePaymentById
);
