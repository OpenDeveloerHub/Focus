const mongoose = require('mongoose');
const focusSegmentSchema = require('./FocusSegment').schema;

const dailyFocusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    totalFocusMinutes: { type: Number, default: 0 },
    projectTimeMap: { type: Map, of: Number, default: {} },
    focusSegments: [focusSegmentSchema]
});

module.exports = mongoose.model('DailyFocus', dailyFocusSchema);