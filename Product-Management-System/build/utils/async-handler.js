"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};
exports.default = asyncHandler;
