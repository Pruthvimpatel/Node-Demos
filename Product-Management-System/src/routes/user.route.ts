import { Router } from "express";
import{registerUser,loginUser,logoutUser,changePassword,resetPassword,updatePassword} from '../controllers/user.controller';
import{USER_ROUTES}from '../constants/routes.constants';
import {verifyToken} from '../middleware/auth.middleware'
import {validateReq} from '../middleware/validation.middleware';
import {registerSchema,LoginSchema,changePasswordSchema,resetPasswordSchema,updatePasswordSchema} from '../utils/validation';

const router = Router();
router.post( USER_ROUTES.REGISTER,validateReq(registerSchema),registerUser);
router.post(USER_ROUTES.LOGIN,validateReq(LoginSchema),loginUser);
router.post(USER_ROUTES.CHANGE_PASSWORD,verifyToken,validateReq(changePasswordSchema),changePassword);
router.post(USER_ROUTES.LOGOUT,verifyToken,logoutUser);
router.post(USER_ROUTES.RESET_PASSWORD,validateReq(resetPasswordSchema), resetPassword); 
router.post(USER_ROUTES.UPDATE_PASSWORD,validateReq(updatePasswordSchema),updatePassword);

export default router;