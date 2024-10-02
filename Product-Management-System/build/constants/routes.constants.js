"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST_API_PREFIX = exports.BASE_API_ROUTES = exports.PRODUCT_ROUTES = exports.USER_ROUTES = void 0;
exports.USER_ROUTES = {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
};
exports.PRODUCT_ROUTES = {
    CREATE: '/create-product',
    GET: '/get-products',
    DELETE: '/delete-product/:id',
    UPDATE: '/update-product/:id',
};
exports.BASE_API_ROUTES = {
    USERS: '/users',
    PRODUCTS: '/products',
};
exports.REST_API_PREFIX = {
    API_V1: '/api/v1'
};
