import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware;
