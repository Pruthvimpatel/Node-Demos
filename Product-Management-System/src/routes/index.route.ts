import { Router } from "express";
import userRoutes from '../routes/user.route';
import productRoutes from '../routes/product.route';
import categoryRoutes from '../routes/category.route';
import {BASE_API_ROUTES} from '../constants/routes.constants'
const router = Router();

router.use(BASE_API_ROUTES.USERS,userRoutes);
router.use(BASE_API_ROUTES.PRODUCTS,productRoutes);
router.use(BASE_API_ROUTES.CATEGORIES,categoryRoutes);
export default router;