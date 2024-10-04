import { Router } from "express";

import {createCategory,getCategory,updateCategory,deleteCategory,getCategoryWithProducts} from '../controllers/category.controller';

import {CATEGORY_ROUTES} from '../constants/routes.constants';

import { verifyToken } from '../middleware/auth.middleware';


const router = Router();

router.post(CATEGORY_ROUTES.CREATE,verifyToken,createCategory);

router.get(CATEGORY_ROUTES.GET,verifyToken,getCategory);

router.put(CATEGORY_ROUTES.UPDATE,verifyToken,updateCategory);

router.delete(CATEGORY_ROUTES.DELETE,verifyToken,deleteCategory);

router.get(CATEGORY_ROUTES.GET_BY_PRODUCT,verifyToken,getCategoryWithProducts);

export default router;