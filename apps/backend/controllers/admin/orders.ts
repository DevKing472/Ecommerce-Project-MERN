import { NextFunction, Request, Response } from 'express';
import { Order } from '../../models/index.js';

export async function getAllOrdersAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await Order.find()
      .populate(['user', 'payment', 'addressBilling', 'addressShipping'])
      .exec();

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
}

export async function getOneOrderAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await Order.findById(req.params.id)
      .populate(['user', 'payment', 'addressBilling', 'addressShipping'])
      .exec();

    if (!orders)
      return res.json({
        success: false,
        message: 'No such order found',
      });

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
}

export async function changeOrderAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Order.updateOne(
      { _id: req.params.id },
      { ...req.body }
    ).exec();
    if (!result.acknowledged)
      return res.json({ success: false, message: 'Could not update order' });
    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteOrderAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await Order.deleteOne({ _id: req.params.id });
    res.json({
      success: order.acknowledged,
      deletedCount: order.deletedCount,
    });
  } catch (err) {
    next(err);
  }
}
