import { Request,Response,NextFunction } from "express";
import bcrypt from 'bcrypt';
import ApiError from "../utils/api-error";
import ApiResponse from "../utils/api-response";
import asyncHandler from "../utils/async-handler";
import db from "../sequelize-client";
import {generateAccessToken,generateRefreshToken,generateResetToken} from "../utils/jwt.token";
import encryption from "../utils/encryption";
import User from "../models/user.model";
import {ERROR_MESSAGES,SUCCESS_MESSAGES} from '../constants/messages';
import {sendResetPasswordEmail} from '../utils/send-email';
import sequelize from "sequelize";


interface MyUserRequest extends Request{
    token?: string;
    user?: User;
  }

 export const registerUser = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    const{email,password,firstName,lastName} = req.body;

    if(!email || !password || !firstName || !lastName) {
        return next(new ApiError(400,ERROR_MESSAGES.REQUIRED_FIELDS));
    }

    try {
   const newUser = await db.User.create({email,password,firstName,lastName});
   console.log("newUser",newUser);
   const response = new ApiResponse(201,newUser,SUCCESS_MESSAGES.USER_CREATED);
   console.log("response",response);
   res.status(201).json(response);
    } catch(error) {
        console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
        return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
    }
 })


 export const loginUser = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
  const {email,password} = req.body;

  if (!email || !password) {
    return next(new ApiError(400, ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED));
  }

  try {
    const user = await db.User.findOne({where: {email}});
    if(!user)
    {
        return next(new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND)); 
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return next(new ApiError(401, ERROR_MESSAGES.INVALID_CREDENTIALS));
      };
    const accessToken = generateAccessToken({userId:user.id,email:user.email});
    const refreshToken = generateRefreshToken({ userId: user.id });
    
    const encryptedAccessToken = encryption.encryptWithAES(accessToken);
    const encryptedRefreshToken = encryption.encryptWithAES(refreshToken);

    await db.AccessToken.bulkCreate([
        {
            tokenType: 'ACCESS',
            token: encryptedAccessToken,
            userId: user.id,
            expiredAt: new Date(Date.now() + 60 * 60 * 1000),
          },
          {
            tokenType: 'REFRESH',
            token: encryptedRefreshToken,
            userId: user.id,
            expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
    ]);
    const response = new ApiResponse(201,{accessToken,refreshToken,user},SUCCESS_MESSAGES.LOGIN_SUCCESS);
    res.status(200).send(response);
  } catch(error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR, error);
    return next(new ApiError(500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
  }
 })


 export const changePassword = asyncHandler(async(req:MyUserRequest,res:Response,next:NextFunction) => {
  const {oldPassword,newPassword} = req.body;
  const user = req.user as User;
  if(!user) {
    return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
  }

  if(!oldPassword || !newPassword) {
    return next(new ApiError(400,ERROR_MESSAGES.OLD_PASSWORD_NEW_PASSWORD_REQUIRED))
  }

  try {
    const isMatch = await bcrypt.compare(oldPassword,user.password);
    if(!isMatch) {
      return next(new ApiError(401,ERROR_MESSAGES.PASSWORD_NOT_MATCHED));
    }

    user.password = newPassword;
    await user.save();

    const response = new ApiResponse(200,null,SUCCESS_MESSAGES.PASSWORD_UPDATED);
    res.json(response);
  } catch(error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
    return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
  }
 })

export const logoutUser = asyncHandler(async(req:MyUserRequest,res:Response,next:NextFunction) => {
const token = req.token;
console.log(token);
if(!token) {
    return next(new ApiError(401,ERROR_MESSAGES.TOKEN_NOT_FOUND));
}    

try {
    const deletedToken = await db.AccessToken.destroy({
        where:{
            token,tokenType: 'ACCESS'
        }
    });

    if(deletedToken == 0) {
        return next(new ApiError(401,ERROR_MESSAGES.TOKEN_NOT_FOUND));
    }

    await db.AccessToken.destroy({
        where:{userId:req.user?.id,tokenType:'REFRESH'}
    });

    const response = new ApiResponse(200,null,SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    res.status(200).json(response);
}  catch(error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR,error)
    return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
}

})

export const resetPassword = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
  const {email} = req.body;

  if(!email) {
    return next(new ApiError(400,ERROR_MESSAGES.EMAIL_REQUIRED));
  }

  try {
    const user = await db.User.findOne({  where: { email } })
    if (!user) {
      return next(new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND));
  }
  const resetToken  = generateResetToken({userId:user.id});
  // const encryptedResetToken = encryption.encryptWithAES(resetToken);

 const userData =  await db.AccessToken.create({
    tokenType: 'RESET',
    token: resetToken,
    userId: user.id,
    expiredAt: new Date(Date.now() + 3600000)
});
 await sendResetPasswordEmail(user.email,resetToken)

 const response = new ApiResponse(200, userData, SUCCESS_MESSAGES.RESET_PASSWORD_EMAIL_SENT,);
 res.status(200).send(response);
  }catch (error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR, error);
    return next(new ApiError(500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
}
})


export const updatePassword = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
  const {token,newPassword} = req.body;
  if(!token || !newPassword) {
    return next(new ApiError(400, ERROR_MESSAGES.TOKEN_PASSWORD_REQUIRED));
  }
  try {
    const accessToken = await db.AccessToken.findOne({
      where: { 
        tokenType: 'RESET',
        token: token, 
        expiredAt: { [sequelize.Op.gt]: new Date() }
    }
    });
    if(!accessToken) {
      return next(new ApiError(400, ERROR_MESSAGES.INVALID_RESET_TOKEN));
    }
    const user = await db.User.findByPk(accessToken.userId);
    if (!user) {
        return next(new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND));
    }

    user.password = await bcrypt.hash(newPassword,10);
    await user.save();

    await db.AccessToken.destroy({ where: { token: accessToken.token, tokenType: 'RESET' } });

    const response = new ApiResponse(200, null, SUCCESS_MESSAGES.PASSWORD_UPDATED);
    res.status(200).send(response);
  } catch (error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR, error);
    return next(new ApiError(500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
}

})