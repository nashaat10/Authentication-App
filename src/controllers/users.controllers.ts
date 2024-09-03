import { Response, Request, NextFunction } from 'express';
import UserModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      message: 'user created successfully',
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'success',
      message: 'users retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      message: 'user retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: 'success',
      message: 'user updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      message: 'user deleted successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'user not found',
      });
    }

    res.json({
      status: 'success',
      message: 'user authenticated successfully',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

