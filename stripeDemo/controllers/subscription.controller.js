const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { name } = require('ejs');
const db = require('../models/index');
const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require('../constant/message');
const Product = db.product;
const Subscription = db.subscription;

exports.renderHomepage = (req, res) => {
    const userId = req.user ? req.user.id : null;
    res.render('index', { userId });
};



exports.subscribe = async (req, res) => {
    const { plan, userId } = req.query;

    if (!plan || !userId) {
        return res.status(400).json({ message: ERROR_MESSAGE.REQUIRED_FIELDS });
    }

    let priceId;
    const MAX_ATTEMPTS = 3;

    try {
        const product = await Product.findOne({
            where: { name: plan.toLowerCase() }
        });

        if (!product) {
            return res.status(400).json({ message: ERROR_MESSAGE.PRODUCT_NOT_FOUND });
        }

        priceId = product.stripePriceId;

        if (!priceId) {
            return res.status(400).json({ message: ERROR_MESSAGE.PRICEID_NOT_FOUND });
        }

        // check if user has previous subscription attempt

        let subscription = await Subscription.findOne({
            where: {
                userId,
                plan
            }
        });
        if(subscription) {
            if(subscription.attempts >= MAX_ATTEMPTS) {
                return res.status(400).json({ message: ERROR_MESSAGE.SUBSCRIPTION_LIMIT_REACHED });
            }
        } else {
            subscription = await Subscription.create({
                stripePriceId: null,
                userId,
                status: 'pending',
                plan: plan.toLowerCase(),
                attempts: 0
            });
        }
        
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });

        await Subscription.create({
            stripeSubscriptionId: session.id,
            userId,
            status: 'pending',
            plan: plan.toLowerCase()
        });
        res.redirect(session.url);
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
    }
};


exports.success = async (req,res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['subscription','subscription.plan.product']
        });
        const subscriptionId = session.subscription ? session.subscription.id : null;

        if(!subscriptionId) {
            res.status(400).json({ message: ERROR_MESSAGE.SUBSCRIPTION_NOT_FOUND});
        }

       await Subscription.update({
           status: 'active',
           stripeSubscriptionId: subscriptionId
       },
       {
          where: {
            stripeSubscriptionId: subscriptionId
          }
       }
    );
    
    res.render('success', {session});
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
    }
};


exports.cancel = async(req,res) => {
const {subscriptionId} = req.query;

try {
    console.log('Attempting to cancel subscription:', subscriptionId);

  await stripe.subscriptions.cancel(subscriptionId);

  await Subscription.update(
    {status: 'canceled'},
    { where: {stripeSubscriptionId: subscriptionId}}
);

res.render('cancel');
} catch(error) {
    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
}
};


exports.manageCustomer = async (req, res) => {
    const { customerId } = req.params;

    if (!customerId) {
        res.status(400).json({ message: ERROR_MESSAGE.CUSTOMER_NOT_FOUND });
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.BASE_URL}/`
        });
        res.redirect(portalSession.url);
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: error.message });
    }
};


