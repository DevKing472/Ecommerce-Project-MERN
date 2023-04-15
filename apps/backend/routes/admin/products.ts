import { upload, passport } from '@/configs/index.js';
import { ProductsController } from '@/controllers/index.js';
import { isUserAdmin } from '@/middlewares/is-user-admin.js';
import { ProductRouter } from '../products.js';

ProductRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  upload.fields([
    { name: 'titleImage', maxCount: 1 },
    { name: 'otherImages', maxCount: 10 },
  ]),
  ProductsController.create
);
ProductRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  ProductsController.updateOne
);
ProductRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  ProductsController.deleteOne
);
