import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/index.js';
import { Product as IProduct } from '../@types/common/product.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const ids: string[] = req.query.ids
      ? JSON.parse(req.query.ids as string)
      : null;
    let products;
    if (ids) {
      products = await Product.find({ _id: { $in: ids } }).exec();
    } else {
      products = await Product.find({}).exec();
    }
    res.json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const titleImagePath = files['titleImage'][0].path.replace(/\\/g, '/');
    const otherImagesPaths = files['otherImages'].map((file) =>
      file.path.replace(/\\/g, '/')
    );

    const product = new Product<IProduct>({
      ...req.body,
      titleImage: `${process.env.HOST_URL}/${titleImagePath}`,
      subImages: [
        ...otherImagesPaths.map((path) => `${process.env.HOST_URL}/${path}`),
      ],
    });
    await product.save();
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Product.deleteOne({ id: req.params.id }).exec();
    if (result.acknowledged) {
      res.json({
        success: true,
      });
      return;
    }
    res.json({
      success: false,
      message: 'Product not found',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      res.json({
        success: false,
        message: 'No such product found',
      });
      return;
    }
    product.set({ ...req.body });
    await product.save();
    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
