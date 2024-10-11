const express = require('express');
const redis = require('redis');

const app = express();
const port = 4000;

// Create a Redis client
const client = redis.createClient();

// Connect to Redis asynchronously
client.connect().catch((err) => {
    console.error('Error connecting to Redis:', err);
});

// Event listeners for Redis client
client.on('connect', () => {
    console.log('Connected to Redis...');
});

client.on('error', (err) => {
    console.log('Redis error: ' + err);
});

// Middleware to parse JSON
app.use(express.json());

// Set a value in Redis
app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    try {
        const reply = await client.set(key, value);
        res.send(`Value set: ${reply}`);
    } catch (err) {
        res.status(500).send('Error setting value in Redis: ' + err.message);
    }
});

// Get a value from Redis
app.get('/get/:key', async (req, res) => {
    const key = req.params.key;
    try {
        const reply = await client.get(key);
        if (reply) {
            res.send(`Value for ${key}: ${reply}`);
        } else {
            res.status(404).send(`Key ${key} not found`);
        }
    } catch (err) {
        res.status(500).send('Error getting value from Redis: ' + err.message);
    }
});

// List all keys in Redis
app.get('/keys', async (req, res) => {
    try {
        const keys = await client.keys('*');
        res.send(keys);
    } catch (err) {
        res.status(500).send('Error retrieving keys from Redis: ' + err.message);
    }
});

// Delete a key from Redis
app.delete('/delete/:key', async (req, res) => {
    const key = req.params.key;
    try {
        const reply = await client.del(key);
        if (reply === 1) {
            res.send(`Key ${key} deleted`);
        } else {
            res.status(404).send(`Key ${key} not found`);
        }
    } catch (err) {
        res.status(500).send('Error deleting key from Redis: ' + err.message);
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
