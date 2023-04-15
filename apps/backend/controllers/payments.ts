import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order.js';
import { Payment } from '../models/payment.js';

export async function getAllPayments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payments = await Payment.find({}).lean().exec();
    res.json({
      success: true,
      payments,
    });
  } catch (err) {
    next(err);
  }
}

export async function createNewPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payment = new Payment({
      ...req.body,
    });
    await payment.save();
    res.json({
      success: true,
      payment,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPaymentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payment = await Payment.findById(req.params.id).lean().exec();
    res.json({
      success: true,
      payment,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePaymentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let payment = await Payment.findById(req.params.id).exec();
    payment = { ...payment, ...req.body };
    await payment?.save();
    res.json({
      success: true,
      payment,
    });
  } catch (err) {
    next(err);
  }
}

export async function deletePaymentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Payment.deleteOne({ _id: req.params.id }).exec();
    res.json({
      success: result.acknowledged,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPaymentByIdAndAddToOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user) {
      return res.json({
        success: false,
        message: 'User is not authorized',
      });
    }

    const payment = await Payment.findById(req.params.id).lean().exec();
    if (!payment) {
      return res.json({
        success: false,
        message: 'No such payment found',
      });
    }

    const order = await Order.findOne({
      ...req.body,
      isOrdered: false,
      user: user._id,
    }).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'No active order found',
      });
    }
    order.payment = payment._id;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}
