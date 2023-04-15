import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { AddressesController } from '../controllers/index.js';

export const AddressesRouter = Router();

AddressesRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  AddressesController.getUserAddresses
);
AddressesRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  AddressesController.createNewAddress
);
