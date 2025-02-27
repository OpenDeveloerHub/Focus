
const DailyFocus = require('../models/DailyFocus');
const FocusSegment = require('../models/FocusSegment');

exports.addFocusSession = async (req, res) => {
    console.log("fersfer");
    try {
        const { userId, startTime, endTime, projectName } = req.body;
        const duration = (new Date(endTime) - new Date(startTime)) / 60000;

        if (duration <= 0) return res.status(400).json({ message: 'Invalid session duration' });

        const focusSegment = new FocusSegment({ startTime, endTime, duration, projectName });

        await focusSegment.save();

        const date = new Date(startTime).toISOString().split('T')[0];
        let dailyFocus = await DailyFocus.findOne({ userId, date });

        if (!dailyFocus) {
            dailyFocus = new DailyFocus({ userId, date, totalFocusMinutes: 0, projectTimeMap: {}, focusSegments: [] });
        }

        dailyFocus.totalFocusMinutes += duration;
        dailyFocus.projectTimeMap.set(projectName, (dailyFocus.projectTimeMap.get(projectName) || 0) + duration);
        dailyFocus.focusSegments.push(focusSegment._id);

        await dailyFocus.save();

        res.status(201).json({ message: 'Focus session added successfully', dailyFocus });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
