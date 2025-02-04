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

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Global CORS Middleware
app.use(cors());

// Express Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/focus', focusRoutes);

app.get('/', (req, res) => {
    res.send('Hello bro');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
