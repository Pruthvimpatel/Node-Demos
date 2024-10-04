export const USER_ROUTES = {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    CHANGE_PASSWORD: '/change-password',
    RESET_PASSWORD: '/reset-password',
    UPDATE_PASSWORD: '/update-password',
    UPLOAD_PROFILE:'/upload-profile',
    UPDATE_PROFILE: '/update-profile'
};

export const PRODUCT_ROUTES = {
    CREATE: '/create-product',
    GET: '/get-products',
    DELETE: '/delete-product/:id',
    UPDATE: '/update-product/:id',
};

export const CATEGORY_ROUTES = {
    CREATE: '/create-category',
    GET: '/get-category',
    DELETE: '/delete-category/:id',
    UPDATE: '/update-category/:id',
    GET_BY_PRODUCT: '/get-product-by-category/:id'
}

export const BASE_API_ROUTES = {
    USERS: '/users',
    PRODUCTS: '/products',
    CATEGORIES: '/categories'
};

export const REST_API_PREFIX = {
    API_V1:'/api/v1'
}