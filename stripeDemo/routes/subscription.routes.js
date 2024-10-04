const express = require('express');
const router = express.Router();
const {renderHomepage,subscribe,success,cancel,manageCustomer}= require('../controllers/subscription.controller');
const {SUBSCRIPTION_ROUTES} = require('../constant/routes.constant');

router.get('/',renderHomepage)

router.get(SUBSCRIPTION_ROUTES.SUBSCRIBE,subscribe);
router.get(SUBSCRIPTION_ROUTES.SUCCESS,success);
router.get(SUBSCRIPTION_ROUTES.CANCEL,cancel);
router.get(SUBSCRIPTION_ROUTES.MANAGE, manageCustomer);

module.exports = router;