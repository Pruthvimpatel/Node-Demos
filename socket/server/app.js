const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the client folder
app.use(express.static('client'));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('send_message', (message) => {
        console.log('Message received:', message);

        // Broadcast the message to all clients
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
