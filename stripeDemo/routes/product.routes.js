const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts} = require('../controllers/product.controller');

router.post('/create',createProduct);

router.get('/getAll',getAllProducts);

module.exports = router