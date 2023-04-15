/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from 'bcryptjs';
import { Request } from 'express';
import {
  SecretOrKeyProvider,
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyCallbackWithRequest,
} from 'passport-jwt';
import { randomString } from '../helpers/index.js';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

class JwtStrategy extends Strategy {
  constructor(
    options: StrategyOptions,
    verify: VerifyCallback | VerifyCallbackWithRequest
  ) {
    super(options, verify);
    this.name = 'jwt';
    this._secretOrKeyProvider = options.secretOrKeyProvider;

    if (options.secretOrKey) {
      if (this._secretOrKeyProvider) {
        throw new TypeError(
          'JwtStrategy has been given both a secretOrKey and a secretOrKeyProvider'
        );
      }
      this._secretOrKeyProvider = function (
        request: Request,
        rawJwtToken: any,
        done: (err: any, secretOrKey?: string | Buffer) => void
      ) {
        done(null, options.secretOrKey);
      };
    }

    if (!this._secretOrKeyProvider) {
      throw new TypeError('JwtStrategy requires a secret or key');
    }

    this._verify = verify;
    if (!this._verify) {
      throw new TypeError('JwtStrategy requires a verify callback');
    }

    this._jwtFromRequest = options.jwtFromRequest;
    if (!this._jwtFromRequest) {
      throw new TypeError(
        'JwtStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)'
      );
    }

    this._passReqToCallback = options.passReqToCallback;
    const jsonWebTokenOptions = options.jsonWebTokenOptions || {};
    this._verifOpts = Object.assign(jsonWebTokenOptions, {
      audience: options.audience,
      issuer: options.issuer,
      algorithms: options.algorithms,
      ignoreExpiration: !!options.ignoreExpiration,
    });
  }
  _secretOrKeyProvider: SecretOrKeyProvider | undefined;
  _passReqToCallback: StrategyOptions['passReqToCallback'];
  _jwtFromRequest: StrategyOptions['jwtFromRequest'];
  _verify: VerifyCallback | VerifyCallbackWithRequest;
  _verifOpts: any;

  static JwtVerifier = jwt.verify;
}

JwtStrategy.prototype.authenticate = async function (
  req: Request,
  options: any
) {
  const token = this._jwtFromRequest(req);

  if (!token) {
    const newUser = new User({
      username: `anon-${randomString(10)}`,
      email: `.`,
      password: bcryptjs.hashSync(
        randomString(3),
        parseInt(process.env.SALT as string)
      ),
      isAnon: true,
    });
    await newUser.save();
    req.user = newUser;
    return this.success(newUser);
  }

  this._secretOrKeyProvider!(req, token, (secretOrKeyError, secretOrKey) => {
    if (secretOrKeyError) {
      this.fail(secretOrKeyError);
    } else {
      JwtStrategy.JwtVerifier(
        token,
        // @ts-expect-error: do nothing
        secretOrKey,
        this._verifOpts,
        (jwt_err: Error, payload: any) => {
          if (jwt_err) {
            return this.fail(jwt_err, 401);
          } else {
            const verified = (err: Error, user: any, info: any) => {
              if (err) {
                return this.error(err);
              } else if (!user) {
                return this.fail(info);
              } else {
                return this.success(user, info);
              }
            };

            try {
              if (this._passReqToCallback) {
                this._verify(req, payload, verified);
              } else {
                // @ts-expect-error: do nothing
                this._verify(payload, verified);
              }
            } catch (ex) {
              this.error(ex as Error);
            }
          }
        }
      );
    }
  });
};

export { JwtStrategy };
