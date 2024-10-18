require('dotenv').config();
const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = 3000;

// Create a Redis client and connect to the server
const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

app.use(express.json());

app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    try {
        await redisClient.set(key, value);
        res.send({ message: `Key "${key}" set successfully!` });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/get/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const value = await redisClient.get(key);
        if (value) {
            res.send({ key, value });
        } else {
            res.status(404).send({ message: `Key "${key}" not found` });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
