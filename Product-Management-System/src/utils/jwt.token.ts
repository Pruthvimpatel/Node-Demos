import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import config from '../config/config';

interface TokenPayload{
    userId:string,
    email?:string
}

export const generateAccessToken = (payload:TokenPayload):string => {
    return jwt.sign(
        payload,
        config.JWT.SECRET,
        { expiresIn: process.env.ACCESS_EXPIRATION_TIME }
    )
};
export const generateRefreshToken = (payload: { userId: string }): string => {
    return jwt.sign(
      payload,
      config.JWT.SECRET,
      { expiresIn: process.env.REFRESH_EXPIRATION_TIME } 
    );
  };


  export const generateResetToken = (payload: { userId: string }): string => {
    return jwt.sign(
      payload,
      config.JWT.SECRET,
      { expiresIn: '1h' }
    );
};  