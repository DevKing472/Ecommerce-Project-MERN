import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import {
  JwtFromRequestFunction,
  Strategy,
  VerifiedCallback,
} from 'passport-jwt';
import { User } from '../models/user.js';
import * as dotenv from 'dotenv';

dotenv.config();

const customPassport = passport;

const cookieExtractor: JwtFromRequestFunction = function (req) {
  return req && req.cookies ? req.cookies['token'] : null;
};

customPassport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.sub).exec();
        if (!user) return done(null, false);
        req.user = user;
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

/*
customPassport.use(
  'jwt-or-new',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.sub).exec();
        if (user) {
          req.user = user;
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
*/

export { customPassport as passport };
