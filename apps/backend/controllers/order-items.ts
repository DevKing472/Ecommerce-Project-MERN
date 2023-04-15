/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { issueToken } from '../configs/jwt.js';
import { getOrCreateOrder } from '../helpers/index.js';
import { Order, OrderItem, Product, User } from '../models/index.js';

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).exec();
    const user = req.user;
    if (!product) {
      return res.json({
        success: false,
        message: 'Product with such ID does not exist.',
      });
    }
    if (product.quantityOnStock < 1) {
      return res.json({
        success: false,
        message: 'We do not have this item on stock any more',
      });
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'User is not authorized',
      });
    }

    const order = await getOrCreateOrder(user._id.toString());
    const userQuery = await User.findById(user._id).exec();
    let orderItem = await OrderItem.findOne({
      product: product._id,
      order: order._id,
    });

    if (orderItem) {
      orderItem.quantity += 1;
    } else {
      orderItem = new OrderItem({
        product: product._id,
        quantity: 1,
        order: order._id,
      });
    }

    await orderItem.save();
    res.json({
      success: true,
      order,
      orderItem,
      ...issueToken(userQuery!),
    });
  } catch (err) {
    next(err);
  }
}

export async function substractFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    if (!product) {
      return res.json({
        success: false,
        message: 'No such product with ID found',
      });
    }

    const order = await Order.findOne({
      user: req.user?._id,
      isOrdered: false,
    }).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'You do not have active order',
      });
    }

    const orderItem = await OrderItem.findOne({
      order: order._id,
      product: product._id,
    }).exec();

    if (!orderItem) {
      return res.json({
        success: false,
        message: 'You do not have this item in your order',
      });
    }

    if (orderItem.quantity > 1) {
      orderItem.quantity -= 1;
    } else {
      await orderItem.deleteOne();
    }

    const newOrderItems = await OrderItem.find({
      order: order._id,
    });

    return res.json({
      success: true,
      message: 'Succesfully substracted',
      'order-items': newOrderItems,
    });
  } catch (err) {
    next(err);
  }
}

export async function removeFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    if (!product) {
      return res.json({
        success: false,
        message: 'No such product with ID found',
      });
    }

    const order = await Order.findOne({
      user: req.user?._id,
      isOrdered: false,
    }).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'You do not have active order',
      });
    }

    const orderItem = await OrderItem.findOne({
      order: order._id,
      product: product._id,
    }).exec();

    if (!orderItem) {
      return res.json({
        success: false,
        message: 'You do not have this item in your order',
      });
    }

    await orderItem.deleteOne();
    const newOrderItems = await OrderItem.find({
      order: order._id,
    });

    return res.json({
      success: true,
      message: 'Succesfully removed',
      'order-items': newOrderItems,
    });
  } catch (err) {
    next(err);
  }
}
