import { Router } from "express";

import {createProduct,getProducts,updateProducts,deleteProduct} from '../controllers/product.controller';

import {PRODUCT_ROUTES} from '../constants/routes.constants';

import { verifyToken } from '../middleware/auth.middleware';

import {createProductSchema,updateProductSchema} from '../utils/express-validator'

import {validateReq} from '../middleware/express-validator'

const router = Router();

router.post(PRODUCT_ROUTES.CREATE,verifyToken,createProductSchema, validateReq,createProduct);

router.get(PRODUCT_ROUTES.GET,verifyToken,getProducts);

router.put(PRODUCT_ROUTES.UPDATE,verifyToken,updateProductSchema, validateReq,updateProducts);

router.delete(PRODUCT_ROUTES.DELETE,verifyToken,deleteProduct);


export default router;