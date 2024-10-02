import { Request,Response,NextFunction } from "express";
import { validationResult } from 'express-validator';
import ApiError from "../utils/api-error";


export const validateReq = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const validationErrors = errors.array().map(err => err.msg);
        return next(new ApiError(400,'Validation error',validationErrors));
    }

    next();
};
