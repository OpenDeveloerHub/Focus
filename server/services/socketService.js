const Leaderboard = require('../models/Leaderboard');

exports.setupWebSockets = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestLeaderboard', async () => {
            const currentWeekStart = getWeekStartDate();
            const leaderboard = await Leaderboard.findOne({ weekStartDate: currentWeekStart });
            if (leaderboard) socket.emit('updateLeaderboard', leaderboard.users);
        });
    });
};

const getWeekStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay()); // Get start of the week (Sunday)
    return date.toISOString().split('T')[0];
};