const express = require('express');
const customerRoutes = require('./customer.routes');
const productRoutes = require('./product.routes');
const subscriptionRoutes = require('./subscription.routes');
const { BASE_API_ROUTES } = require('../constant/routes.constant');

const router = express.Router();

router.use(BASE_API_ROUTES.CUSTOMERS,customerRoutes);
router.use(BASE_API_ROUTES.PRODUCTS,productRoutes);
router.use(BASE_API_ROUTES.SUBSCRIPTION,subscriptionRoutes);

module.exports = router;