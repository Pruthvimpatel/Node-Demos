"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_error_1 = __importDefault(require("../utils/api-error"));
const api_response_1 = __importDefault(require("../utils/api-response"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const sequelize_client_1 = __importDefault(require("../sequelize-client"));
const jwt_token_1 = require("../utils/jwt.token");
const encryption_1 = __importDefault(require("../utils/encryption"));
const messages_1 = require("../constants/messages");
exports.registerUser = (0, async_handler_1.default)(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        return next(new api_error_1.default(400, messages_1.ERROR_MESSAGES.REQUIRED_FIELDS));
    }
    try {
        const newUser = await sequelize_client_1.default.User.create({ email, password, firstName, lastName });
        console.log("newUser", newUser);
        const response = new api_response_1.default(201, newUser, messages_1.SUCCESS_MESSAGES.USER_CREATED);
        console.log("response", response);
        res.status(201).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
exports.loginUser = (0, async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new api_error_1.default(400, messages_1.ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED));
    }
    try {
        const user = await sequelize_client_1.default.User.findOne({ where: { email } });
        if (!user) {
            return next(new api_error_1.default(404, messages_1.ERROR_MESSAGES.USER_NOT_FOUND));
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.INVALID_CREDENTIALS));
        }
        ;
        const accessToken = (0, jwt_token_1.generateAccessToken)({ userId: user.id, email: user.email });
        const refreshToken = (0, jwt_token_1.generateRefreshToken)({ userId: user.id });
        const encryptedAccessToken = encryption_1.default.encryptWithAES(accessToken);
        const encryptedRefreshToken = encryption_1.default.encryptWithAES(refreshToken);
        await sequelize_client_1.default.AccessToken.bulkCreate([
            {
                tokenType: 'ACCESS',
                token: encryptedAccessToken,
                userId: user.id,
                expiredAt: new Date(Date.now() + 60 * 60 * 1000),
            },
            {
                tokenType: 'REFRESH',
                token: encryptedRefreshToken,
                userId: user.id,
                expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
        ]);
        const response = new api_response_1.default(201, { accessToken, refreshToken, user }, messages_1.SUCCESS_MESSAGES.LOGIN_SUCCESS);
        res.status(200).send(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
exports.logoutUser = (0, async_handler_1.default)(async (req, res, next) => {
    const token = req.token;
    console.log(token);
    if (!token) {
        return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.TOKEN_NOT_FOUND));
    }
    try {
        const deletedToken = await sequelize_client_1.default.AccessToken.destroy({
            where: {
                token, tokenType: 'ACCESS'
            }
        });
        if (deletedToken == 0) {
            return next(new api_error_1.default(401, messages_1.ERROR_MESSAGES.TOKEN_NOT_FOUND));
        }
        await sequelize_client_1.default.AccessToken.destroy({
            where: { userId: req.user?.id, tokenType: 'REFRESH' }
        });
        const response = new api_response_1.default(200, null, messages_1.SUCCESS_MESSAGES.LOGOUT_SUCCESS);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(messages_1.ERROR_MESSAGES.SOMETHING_ERROR, error);
        return next(new api_error_1.default(500, messages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, [error]));
    }
});
