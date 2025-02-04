const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const focusRoutes = require('./routes/focusRoutes');
// const { setupWebSockets } = require('./services/socketService');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
    origin: 'https://focusflowed.vercel.app', // Allow requests from frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies/auth headers
}));

// Middleware to handle preflight requests (OPTIONS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://focusflowed.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// JSON Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello bro');
});

app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/focus', focusRoutes);

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket Setup
// setupWebSockets(server);
