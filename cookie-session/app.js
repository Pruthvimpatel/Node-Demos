// this is a basic demo of how session-based authentication works in a express.

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Set up the body parser middleware to handle JSON data
app.use(bodyParser.json());

// Set up the session middleware
app.use(session({
    secret: 'AKHDHDJMSXBCJKLSJSGS',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        secure: false 
    }
}));

// creating dummy user
const users = {
    admin: { username: 'admin', password: '12345' }
};

// API to check if a user is authenticated
app.get('/api/auth/status', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.json({ authenticated: true });
    }
    res.json({ authenticated: false });
});

// Login API
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username] && users[username].password === password) {
        req.session.isLoggedIn = true;
        req.session.user = users[username]; // Optionally store user data
        return res.json({ message: 'Login successful', authenticated: true });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Logout API 
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Protected API route
app.get('/api/protected', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'You have access to protected data' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
