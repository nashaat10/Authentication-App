import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import config from '../config';
import Error from '../interfaces/error.interface';

const handelUnAuthorized = (next: NextFunction) => {
  const error: Error = new Error('Login error: please try again');
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.get('Authorization');
    // console.log(authHeader);
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decoded = jwt.verify(
          token,
          config.tokenSecret as unknown as string,
        );
        if (decoded) {
          next();
        } else {
          handelUnAuthorized(next);
        }
      } else {
        handelUnAuthorized(next);
      }
    } else {
      handelUnAuthorized(next);
    }
  } catch (error) {
    handelUnAuthorized(next);
  }
};

export default validateTokenMiddleware;
