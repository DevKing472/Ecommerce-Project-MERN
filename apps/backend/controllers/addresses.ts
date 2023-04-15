import { NextFunction, Request, Response } from 'express';
import { Address } from '../models/address.js';

export async function getUserAddresses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addresses = await Address.find({ user: req.user?._id })
      .sort('createdAt')
      .lean()
      .exec();
    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    next(err);
  }
}

export async function createNewAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const address = new Address({ ...req.body, user: req.user });
    await address.save();
    res.json({
      success: true,
      address: address.id,
    });
  } catch (err) {
    next(err);
  }
}
