"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../routes/user.route"));
const product_route_1 = __importDefault(require("../routes/product.route"));
const routes_constants_1 = require("../constants/routes.constants");
const router = (0, express_1.Router)();
router.use(routes_constants_1.BASE_API_ROUTES.USERS, user_route_1.default);
router.use(routes_constants_1.BASE_API_ROUTES.PRODUCTS, product_route_1.default);
exports.default = router;
