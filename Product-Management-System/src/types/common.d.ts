// import { Request, Response } from 'express';
import User  from '../models/user.model';

declare global {
  namespace Express {
    export interface Request {
      token?: string;
      user?: User;
    }
  }
}



