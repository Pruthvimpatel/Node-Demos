import { Request,Response,NextFunction } from "express";
// import bcrypt from 'bcrypt';
import ApiError from "../utils/api-error";
import ApiResponse from "../utils/api-response";
import asyncHandler from "../utils/async-handler";
import db from "../sequelize-client";
import {ERROR_MESSAGES,SUCCESS_MESSAGES} from '../constants/messages'
import User from "../models/user.model";

import { console } from "inspector";


interface NewRequest extends Request{
    token?: string;
    user?: User;
  }

//create-category
export const createCategory =  asyncHandler(async(req:NewRequest,res:Response,next:NextFunction) => {
   const {name,description} = req.body;
   const user = req.user;
   if(!user) {
    return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
   }

   if(!name || !description) {
    return next(new ApiError(401,ERROR_MESSAGES.REQUIRED_FIELDS));
   }
   try {
     const category = await db.Category.create({
      name,
      description,
      userId: user.id
     });
     const response = new ApiResponse(201,category,SUCCESS_MESSAGES.CATEGORY_CREATED);
     res.status(200).json(response);
   } catch(error) {

    console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
    return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
   }
})

//list
export const getCategory = asyncHandler(async(req:NewRequest,res:Response,next:NextFunction) => {
    const user = req.user;
    if(!user) {
        return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
       }
    try {
        const categories = await db.Category.findAll();
        const response = new ApiResponse(200,categories,SUCCESS_MESSAGES.CATEGORY_RETRIEVED);
        res.status(200).json(response);
    } catch(error) {
        console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
        return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
    }
})

//update-category
export const updateCategory = asyncHandler(async(req:NewRequest,res:Response,next:NextFunction) => {
  
    const {id} = req.params;
    const user = req.user;
    if(!user) {
        return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
    }
    const {name,description} = req.body;
    try {
       const category = await db.Category.findByPk(id);
       if(!category) {
        return next(new ApiError(404,ERROR_MESSAGES.CATEGORY_NOT_FOUND));
       };
       if(category.userId !== user.id) {
        return next(new ApiError(404,ERROR_MESSAGES.PERMISSION_DENIED));    
       };

       const updatedCategory = await category.update({
        name,
        description
       });
       const response = new ApiResponse(200,updatedCategory,SUCCESS_MESSAGES.CATEGORY_UPDATED);
       res.status(200).json(response);
    } catch(error) {
        console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
        return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
    }

})

//delete-category
export const deleteCategory = asyncHandler(async(req:NewRequest,res:Response,next:NextFunction) => {

    const {id} = req.params;
    const user = req.user;
    if(!user) {
        return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
    }
    try {
        const category = await db.Category.findByPk(id);
        if(!category) {
         return next(new ApiError(404,ERROR_MESSAGES.CATEGORY_NOT_FOUND));
        };
        if(category.userId !== user.id) {
         return next(new ApiError(404,ERROR_MESSAGES.PERMISSION_DENIED));    
        };
        const deletedCategory = await category.destroy();
        const response = new ApiResponse(200,deletedCategory,SUCCESS_MESSAGES.CATEGORY_DELETED);
        res.status(200).json(response);
    } catch(error) {
        console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
        return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
    }
});

//get-category-with-product

export const getCategoryWithProducts = asyncHandler(async(req:NewRequest,res:Response,next:NextFunction) => {
  console.log("test");
  const {id} = req.params;
  const user = req.user;
  if(!user) {
    return next(new ApiError(401,ERROR_MESSAGES.USER_NOT_FOUND));
  }
  try {
    const category = await db.Category.findOne({
        where: {
            id
        },
        include: [
            {
                model: db.Product
            }
        ]
    });
    if(!category) {
        return next(new ApiError(404,ERROR_MESSAGES.CATEGORY_NOT_FOUND));
    }

    const response = new ApiResponse(200,category,SUCCESS_MESSAGES.CATEGORY_RETRIEVED);
    res.status(200).json(response);
  } catch(error) {
    console.error(ERROR_MESSAGES.SOMETHING_ERROR,error);
    return next(new ApiError(500,ERROR_MESSAGES.INTERNAL_SERVER_ERROR,[error]));
  }
});