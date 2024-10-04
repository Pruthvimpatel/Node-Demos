const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts} = require('../controllers/product.controller');
const {PRODUCT_ROUTES} = require('../constant/routes.constant');


router.post(PRODUCT_ROUTES.CREATE,createProduct);
router.get(PRODUCT_ROUTES.GET,getAllProducts);

module.exports = router