const CUSTOMER_ROUTES = {
    CREATE: '/create',
    GET:'/getAll'
};

const PRODUCT_ROUTES = {
    CREATE: '/create',
    GET: '/getAll'
};
const SUBSCRIPTION_ROUTES = {
    SUBSCRIBE: '/subscribe',
    CANCEL: '/cancel',
    SUCCESS: '/success',
    MANAGE: '/customers/:customerId'
}
const BASE_API_ROUTES = {
    CUSTOMERS: '/customers',
    PRODUCTS: '/products',
    SUBSCRIPTION: '/subscription',
};

const REST_API_PREFIX = {
    API: '/api'
};

module.exports = {
    CUSTOMER_ROUTES,
    BASE_API_ROUTES,
    REST_API_PREFIX,
    PRODUCT_ROUTES,
    SUBSCRIPTION_ROUTES
}
