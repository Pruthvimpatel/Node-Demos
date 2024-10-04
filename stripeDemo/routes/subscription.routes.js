const express = require('express');
const router = express.Router();
const {renderHomepage,subscribe,success,cancel,manageCustomer}= require('../controllers/subscription.controller');

router.get('/',renderHomepage)

router.get('/subscribe',subscribe);

router.get('/success',success);

router.get('/cancel',cancel);

router.get('/customers/:customerId', manageCustomer);

module.exports = router;