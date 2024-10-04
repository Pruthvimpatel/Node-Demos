const express = require('express');
const router = express.Router();
const {createCustomer, getAllCustomers} = require('../controllers/customer.controller');

router.post('/create',createCustomer);
router.get('/getAll',getAllCustomers);

module.exports = router