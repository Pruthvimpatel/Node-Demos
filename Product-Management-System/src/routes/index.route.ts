import { Router } from "express";
import userRoutes from '../routes/user.route';
import productRoutes from '../routes/product.route';
import {BASE_API_ROUTES} from '../constants/routes.constants'
const router = Router();

router.use(BASE_API_ROUTES.USERS,userRoutes);
router.use(BASE_API_ROUTES.PRODUCTS,productRoutes);
export default router;