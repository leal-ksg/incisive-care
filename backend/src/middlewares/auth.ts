import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    res.sendStatus(501);
    return;
  }

  if (!authorization) {
    res.status(401).send({ error: 'Please authenticate' });
    return;
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user as User;
    next();
    return;
  });

  res.sendStatus(501);
  return;
};
