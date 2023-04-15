import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { AuthController } from '../controllers/index.js';

export const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);
AuthRouter.get('/register-anon', AuthController.registerAnon);
AuthRouter.get('/logout', AuthController.logout);
AuthRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {
      res.json({
        success: true,
        message: 'access granted',
      });
    } catch (err) {
      next(err);
    }
  }
);
