import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: {
        status: 'error',
        message: 'Too many requests, please try again later.',
    },
    headers: true,
});

export default apiLimiter;