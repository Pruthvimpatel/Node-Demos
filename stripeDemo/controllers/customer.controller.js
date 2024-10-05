const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models/index');
const Customer = db.customer;
const {ERROR_MESSAGE,SUCCESS_MESSAGE} = require('../constant/message');

//create-customer api
exports.createCustomer = async (req,res) => {
 const {name, email} = req.body;

 if (!name || !email) {
    return res.status(400).send({ message: ERROR_MESSAGE.REQUIRED_FIELDS });
      }
 try {
    const stripeCustomer = await stripe.customers.create({
        name,
        email
    });

    const customer = await Customer.create({
        name,
        email,
        stripeCustomerId: stripeCustomer.id
    });

    res.status(201).send({ message: SUCCESS_MESSAGE.CUSTOMER_CREATED, customer });

 } catch (error) {
    res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
}
};


//get-customer api
exports.getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send({ message: SUCCESS_MESSAGE.CUSTOMER_RETRIEVED, customers });
    } catch(error) {
        res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
    }
}