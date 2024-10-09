const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const throttlingMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max:3,
    delayMs: 1000,
    handler:(req,res,next) => {
        setTimeout(() => {
            res.status(429).json({
                status: 'error',
                message:'Too many requests,you are being throttled.Please wait before trying again.'
            });
        },1000);
    },
    header:true,
});

app.use('/api',throttlingMiddleware);


app.get('/api',(req,res) => {
    res.status(200).json({
        status: 'success',
        message: 'You have access to this API'
    });
});

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})