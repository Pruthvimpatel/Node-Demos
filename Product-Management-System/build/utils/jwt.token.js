"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT.SECRET, { expiresIn: process.env.ACCESS_EXPIRATION_TIME });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT.SECRET, { expiresIn: process.env.REFRESH_EXPIRATION_TIME });
};
exports.generateRefreshToken = generateRefreshToken;
