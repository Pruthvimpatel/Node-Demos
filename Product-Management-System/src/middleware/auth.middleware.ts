import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import  jwt  from 'jsonwebtoken';
import config from '../config/config';
import db from '../sequelize-client';
import ApiError from '../utils/api-error';
import asyncHandler from '../utils/async-handler';
import User from '../models/user.model';
import encryption from '../utils/encryption';

interface MyUserRequest extends Request{
    token?: string;
    user?: User;
}

export const verifyToken = asyncHandler(async (req: MyUserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
        return next(new ApiError(401, 'Unauthorized - Token not provided'));
    }
    try {

       const decoded = jwt.verify(token, config.JWT.SECRET as string) as { userId: string };
     
      const encryptedToken  = await db.AccessToken.findOne({
        where: {
          userId:decoded.userId,
          tokenType: 'ACCESS',
        }
      });
      if (!encryptedToken) {
        console.log('Token not found or expired');
        return next(new ApiError(401, 'Unauthorized - Token not found or expired'));
      }

      const decryptedToken = encryption.decryptWithAES(encryptedToken.token);
      if (decryptedToken !== token) {
        return next(new ApiError(401, 'Unauthorized - Token mismatch'));
      }

      const user = await db.User.findOne({
        where: { id: decoded.userId }
      });
  
      if (!user) {
        return next(new ApiError(401, 'Unauthorized - User not found'));
      }
      
      req.token = token;
      req.user = user;

      next();
    } catch (err) {
      console.error(err);
      return next(new ApiError(401, 'Unauthorized - Invalid token', [err]));
    }
  });