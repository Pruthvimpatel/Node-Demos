"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProducts = exports.getProducts = exports.createProduct = void 0;
// import bcrypt from 'bcrypt';
const api_error_1 = __importDefault(require("../utils/api-error"));
const api_response_1 = __importDefault(require("../utils/api-response"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const sequelize_client_1 = __importDefault(require("../sequelize-client"));
const messages_1 = require("../constants/messages");
//create-product
exports.createProduct = (0, async_handler_1.default)(async (req, res, next) => {
    const { name, price, description } = req.body;
    const user = req.user;
    if (!user) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.USER_NOT_FOUND));
    }
    if (!name || !price || !description) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.REQUIRED_FIELDS));
    }
    try {
        const product = await sequelize_client_1.default.Product.create({
            name,
            price,
            description,
            userId: user.id
        });
        const response = new api_response_1.default(201, product, messages_1.SUCCESS_MESSAGES.PRODUCT_CREATED);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
//list
exports.getProducts = (0, async_handler_1.default)(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.USER_NOT_FOUND));
    }
    try {
        const product = await sequelize_client_1.default.Product.findAll({ where: { userId: user.id } });
        const response = new api_response_1.default(200, product, messages_1.SUCCESS_MESSAGES.PRODUCTS_RETRIEVED);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
//update-product
exports.updateProducts = (0, async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    // console.log("user",user);
    if (!user) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.USER_NOT_FOUND));
    }
    const { name, price, description } = req.body;
    try {
        const product = await sequelize_client_1.default.Product.findByPk(id);
        console.log("product", product);
        if (!product) {
            return next(new api_error_1.default(404, messages_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND));
        }
        ;
        if (product.userId !== user.id) {
            return next(new api_error_1.default(404, messages_1.ERROR_MESSAGES.PERMISSION_DENIED));
        }
        ;
        const updateProduct = await product.update({
            name,
            price,
            description
        }, {
            where: { userId: user.id }
        });
        const response = new api_response_1.default(200, updateProduct, messages_1.SUCCESS_MESSAGES.PRODUCT_UPDATED);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
//delete-product
exports.deleteProduct = (0, async_handler_1.default)(async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    console.log("id", req.params.id);
    if (!user) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.USER_NOT_FOUND));
    }
    try {
        const deleteProduct = await sequelize_client_1.default.Product.destroy({
            where: {
                userId: user.id,
                id: id
            }
        });
        const affectedRows = Number(deleteProduct);
        if (affectedRows === 0) {
            return next(new api_error_1.default(404, messages_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND));
        }
        const response = new api_response_1.default(200, messages_1.SUCCESS_MESSAGES.PRODUCT_DELETED);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
