const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models/index');
const Customer = db.customer;

//create-customer api
exports.createCustomer = async (req,res) => {
 const {name, email} = req.body;

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

    res.status(201).send(customer);

 } catch (error) {
    res.status(500).send({message: error.message});
 }
};


//get-customer api
exports.getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send(customers);
    } catch(error) {
        res.status(500).send({message: error.message})
    }
}