const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models/index');
const Product = db.product;
const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require('../constant/message');

exports.createProduct = async (req,res) => {
    const {name,price} = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: ERROR_MESSAGE.REQUIRED_FIELDS });
  }

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
        res.status(201).json({ message: SUCCESS_MESSAGE.PRODUCT_CREATED, products });
    } catch (error) {
      res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
    }
};

exports.getAllProducts = async (req,res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ message: SUCCESS_MESSAGE.PRODUCT_RETRIEVED, products });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
  }
};