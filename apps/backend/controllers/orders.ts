/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response, Request } from 'express';
import { Order, OrderItem, Product } from '../models/index.js';
import { getOrCreateOrder } from '../helpers/index.js';

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }
    const order = await getOrCreateOrder(req.user._id.toString());
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function changeOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    const user = req.user;
    if (!user)
      return res.json({
        success: false,
        message: 'User is unidentified',
      });
    if (!user._id.equals(order.user.toString())) {
      return res.json({
        success: false,
        message: 'You are not the user of this order',
      });
    }

    order.isOrdered = true;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    if (req.body.shippingAddress) {
      order.addressShipping = req.body.shippingAddress;
    }
    if (req.body.billingAddress) {
      order.addressBilling = req.body.billingAddress;
    }
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    if (req.body.paymentID) {
      order.payment = req.body.paymentID;
    }
    await order.save();
    order = await Order.findById(req.params.id).populate('payment').exec();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function addItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result = true;

    const cartItems: { id: string; quantity: string }[] = req.body.cartItems;
    const order = await getOrCreateOrder(req.user!._id.toString());

    for (const item of cartItems) {
      const product = await Product.findById(item.id).exec();
      if (!product) {
        result = false;
        break;
      }
      await new OrderItem({
        order,
        product,
        quantity: item.quantity,
      }).save();
    }

    if (!result) {
      return res.json({
        success: result,
        message: 'Something went wrong with items',
      });
    }

    const orderItems = await OrderItem.find({ order: order._id })
      .populate('order')
      .exec();
    res.json({
      success: result,
      order,
      orderItems,
    });
  } catch (err) {
    next(err);
  }
}
