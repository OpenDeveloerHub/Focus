const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const focusRoutes = require('./routes/focusRoutes');
const { setupWebSockets } = require('./services/socketService');
// const { Server } = require('socket.io');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Proper CORS configuration for API requests
app.use(cors({
    origin: 'https://focusflowed.vercel.app', // Allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Create Socket.io server with CORS configuration
// const io = new Server(server, {
//     cors: {
//         origin: 'https://focusflowed.vercel.app',
//         methods: ['GET', 'POST']
//     }
// });

// // Setup WebSocket connections
// setupWebSockets(io);

app.get('/', (req, res) => {
    res.send('Hello bro');
});

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/focus', focusRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
