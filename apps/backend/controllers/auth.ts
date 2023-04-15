import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';
import { issueToken } from '../configs/jwt.js';
import { randomString } from '../helpers/random-string.js';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: { [field: string]: string | undefined } =
      req.body;

    if (!password) {
      return res.json({
        success: false,
        message: 'You need to provide password',
      });
    }

    if (!email) {
      return res.json({
        success: false,
        message: 'You need to provide email',
      });
    }

    const user = await User.findOne({ email, isAnon: false }).exec();
    if (!user) {
      return res.json({
        success: false,
        message: 'No such user found',
      });
    }

    const result = bcryptjs.compareSync(password, user.password);
    if (!result) {
      return res.json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const { token } = await issueToken(user);
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, secret }: { [field: string]: string | undefined } =
      req.body;
    if (!password) {
      return res.json({
        success: false,
        message: 'Need to provide password',
      });
    }

    if (!email) {
      return res.json({
        success: false,
        message: 'Need to provide unique email',
      });
    }

    const userByEmail = await User.exists({
      email: { $regex: email, $options: 'i' },
    }).exec();

    if (userByEmail) {
      return res.json({
        success: false,
        message: 'Username or email already taken',
      });
    }

    const hashedPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALT as string)
    );
    const user = new User({
      email,
      password: hashedPassword,
      isAdmin: secret === process.env.ADMIN_SECRET,
    });
    await user.save();
    const { token } = issueToken(user);
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function registerAnon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hashedPassword = bcryptjs.hashSync(
      randomString(5),
      parseInt(process.env.SALT as string)
    );
    const user = new User({
      email: `${randomString(5)}@anon.com`,
      password: hashedPassword,
      isAnon: true,
    });
    await user.save();
    const { token } = issueToken(user);
    res.cookie('token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    });
    res.json({
      success: true,
      user: { id: user.id },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token');
    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
