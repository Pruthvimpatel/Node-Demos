const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models/index');
const Product = db.product;

exports.createProduct = async (req,res) => {
    const {name,price} = req.body;

    try {
        const stripeProduct = await stripe.products.create({
            name
        });
        const stripePrice = await stripe.prices.create({
            unit_amount: price * 100,
            currency: 'usd',
            product: stripeProduct.id
        });

        const products = await Product.create({
            name,
            price,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id
        });
        res.status(201).send(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

exports.getAllProducts = async (req,res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};