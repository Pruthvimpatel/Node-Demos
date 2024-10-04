const express = require('express');
const router = express.Router();
const {createCustomer, getAllCustomers} = require('../controllers/customer.controller');
const {CUSTOMER_ROUTES} = require('../constant/routes.constant');

router.post(CUSTOMER_ROUTES.CREATE,createCustomer);
router.get(CUSTOMER_ROUTES.GET,getAllCustomers);
module.exports = router;