import { Request, Response, NextFunction } from 'express';
import { User } from '../models/index.js';

export async function isUserAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized',
    });
  }

  const user = await User.findById(req.user._id).exec();
  if (!user?.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Admin only access',
    });
  }
  next();
}
