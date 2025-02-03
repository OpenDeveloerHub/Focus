const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    weekStartDate: { type: String, required: true },
    users: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        profilePicture: { type: String },
        totalFocusMinutes: { type: Number, required: true, default: 0 },
        rank: { type: Number, required: true }
    }],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);