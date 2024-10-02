import { Request, Response, NextFunction } from "express";
import Joi from 'joi';
import ApiError from "../utils/api-error";

export const validateReq = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return next(new ApiError(
                400, 
                `Validation error: ${error.details.map((e) => e.message).join(', ')}`
            ));
        } else {
            req.body = value;
            next();
        }
    };
};
