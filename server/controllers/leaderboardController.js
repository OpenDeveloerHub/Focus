const Leaderboard = require('../models/Leaderboard');
const DailyFocus = require('../models/DailyFocus');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
    try {
        const currentWeekStart = getWeekStartDate();
        let leaderboard = await Leaderboard.findOne({ weekStartDate: currentWeekStart });

        if (!leaderboard) {
            leaderboard = await generateLeaderboard(currentWeekStart);
        }

        res.json(leaderboard.users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWeekStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
    return date.toISOString().split('T')[0];
};

const generateLeaderboard = async (weekStartDate) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyData = await DailyFocus.aggregate([
        { $match: { date: { $gte: oneWeekAgo.toISOString().split('T')[0] } } },
        { $group: { _id: "$userId", totalFocusMinutes: { $sum: "$totalFocusMinutes" } } },
        { $sort: { totalFocusMinutes: -1 } }
    ]);

    const users = await Promise.all(weeklyData.map(async (entry, index) => {
        const user = await User.findById(entry._id);
        return { userId: user._id, username: user.username, profilePicture: user.profilePicture, totalFocusMinutes: entry.totalFocusMinutes, rank: index + 1 };
    }));

    const leaderboard = new Leaderboard({ weekStartDate, users });
    await leaderboard.save();
    return leaderboard;
};