const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
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
    console.log("Reached API");

    try {
        const { userId } = req.params; // Extract userId from request params

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Convert userId to ObjectId format
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Check if the user exists
        const user = await User.findById(userObjectId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get total focus minutes for the past week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyData = await DailyFocus.aggregate([
            {
                $match: {
                    date: { $gte: oneWeekAgo.toISOString().split('T')[0] } // Filter last 7 days
                }
            },
            {
                $group: {
                    _id: "$userId",  // Group by `userId`
                    totalFocusMinutes: { $sum: "$totalFocusMinutes" } // Sum focus minutes
                }
            },
            {
                $sort: { totalFocusMinutes: -1 } // Sort in descending order
            }
        ]);

        console.log("Weekly Data:", weeklyData); // Debugging

        // Create a map of user focus minutes
        const focusDataMap = weeklyData.reduce((acc, entry) => {
            acc[entry._id.toString()] = entry.totalFocusMinutes;
            return acc;
        }, {});

        // Get all users
        const allUsers = await User.find({}, "_id");

        // Assign ranks
        const sortedUsers = allUsers
            .map(user => ({
                userId: user._id.toString(),
                totalFocusMinutes: focusDataMap[user._id.toString()] || 0 // Default to 0 if no data
            }))
            .sort((a, b) => b.totalFocusMinutes - a.totalFocusMinutes);

        // Find the user's rank
        const userRank = sortedUsers.findIndex(user => user.userId === userId) + 1;
        const userFocusMinutes = focusDataMap[userId] || 0;

        return res.json({ userId, rank: userRank, totalFocusMinutes: userFocusMinutes });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
