const DailyFocus = require('../models/DailyFocus');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Pagination parameters from query string
        const { page = 1, limit = 25 } = req.query;
        const skip = (page - 1) * limit;

        // Get total users count for pagination purposes
        const totalUsers = await User.countDocuments();

        // Aggregate the focus time data for the past week
        const weeklyData = await DailyFocus.aggregate([
            { $match: { date: { $gte: oneWeekAgo.toISOString().split('T')[0] } } },
            { $group: { _id: "$userId", totalFocusMinutes: { $sum: "$totalFocusMinutes" } } },
        ]);

        const focusDataMap = weeklyData.reduce((acc, entry) => {
            acc[entry._id] = entry.totalFocusMinutes;
            return acc;
        }, {});

        // Fetch all users for the leaderboard
        const users = await User.find().skip(skip).limit(limit);

        // Create the leaderboard with total focus minutes and rank
        const leaderboard = users.map((user, index) => {
            const totalFocusMinutes = focusDataMap[user._id] || 0;
            return {
                userId: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
                totalFocusMinutes,
                rank: skip + index + 1,
            };
        });

        // Get total number of pages for pagination
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users: leaderboard,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserRank = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get total focus minutes for the past week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyData = await DailyFocus.aggregate([
            { $match: { date: { $gte: oneWeekAgo.toISOString().split('T')[0] } } },
            { $group: { _id: "$userId", totalFocusMinutes: { $sum: "$totalFocusMinutes" } } },
        ]);

        const focusDataMap = weeklyData.reduce((acc, entry) => {
            acc[entry._id] = entry.totalFocusMinutes;
            return acc;
        }, {});

        // Sort users by total focus minutes
        const sortedUsers = Object.keys(focusDataMap)
            .map(userId => ({
                userId,
                totalFocusMinutes: focusDataMap[userId],
            }))
            .sort((a, b) => b.totalFocusMinutes - a.totalFocusMinutes);

        // Find the rank of the requested user
        const userRank = sortedUsers.findIndex(user => user.userId === userId) + 1;

        if (userRank > 0) {
            res.json({ rank: userRank });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
