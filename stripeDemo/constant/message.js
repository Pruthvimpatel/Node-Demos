const ERROR_MESSAGE = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    CUSTOMER_NOT_FOUND: 'Customer not found',
    PRODUCT_NOT_FOUND: 'Invalid subscription plan',
    SUBSCRIPTION_NOT_FOUND: 'Subscription not found',
    SUBSCRIPTION_NOT_ACTIVE: 'Subscription not active',
    SUBSCRIPTION_ALREADY_ACTIVE: 'Subscription already active',
    REQUIRED_FIELDS: 'Required fields are missing',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    PRICEID_NOT_FOUND: 'Price ID not found',
    SUBSCRIPTION_LIMIT_REACHED: 'Subscription limit reached',
};

const SUCCESS_MESSAGE = {
    CUSTOMER_CREATED: 'Customer created successfully',
    PRODUCT_CREATED: 'Product created successfully',
    SUBSCRIPTION_CREATED: 'Subscription created successfully',
    SUBSCRIPTION_SUCCESS: 'Subscription created successfully',
    CANCEL_SUBSCRIPTION: 'Subscription canceled successfully',
    CUSTOMER_RETRIEVED: 'Customer retrieved successfully',
    PRODUCT_RETRIEVED: 'Product retrieved successfully',
    SUCCESS: 'Success',
};

module.exports = {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE
};
