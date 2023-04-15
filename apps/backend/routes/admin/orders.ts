import { AdminController } from '../../controllers/index.js';
import { Router } from 'express';

export const AdminProductRouter = Router();

AdminProductRouter.get('/', AdminController.getAllOrdersAdmin);
AdminProductRouter.get('/:id', AdminController.getOneOrderAdmin);
AdminProductRouter.post('/:id/delete', AdminController.deleteOrderAdmin);
