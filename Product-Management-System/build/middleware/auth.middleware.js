"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const sequelize_client_1 = __importDefault(require("../sequelize-client"));
const api_error_1 = __importDefault(require("../utils/api-error"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const encryption_1 = __importDefault(require("../utils/encryption"));
exports.verifyToken = (0, async_handler_1.default)(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new api_error_1.default(401, 'Unauthorized - Token not provided'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT.SECRET);
        const encryptedToken = await sequelize_client_1.default.AccessToken.findOne({
            where: {
                userId: decoded.userId,
                tokenType: 'ACCESS',
            }
        });
        if (!encryptedToken) {
            console.log('Token not found or expired');
            return next(new api_error_1.default(401, 'Unauthorized - Token not found or expired'));
        }
        const decryptedToken = encryption_1.default.decryptWithAES(encryptedToken.token);
        if (decryptedToken !== token) {
            return next(new api_error_1.default(401, 'Unauthorized - Token mismatch'));
        }
        const user = await sequelize_client_1.default.User.findOne({
            where: { id: decoded.userId }
        });
        if (!user) {
            return next(new api_error_1.default(401, 'Unauthorized - User not found'));
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        return next(new api_error_1.default(401, 'Unauthorized - Invalid token', [err]));
    }
});
