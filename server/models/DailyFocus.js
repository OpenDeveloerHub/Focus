const mongoose = require('mongoose');
const FocusSegment = require('./FocusSegment');

const dailyFocusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    totalFocusMinutes: { type: Number, default: 0 },
    projectTimeMap: { type: Map, of: Number, default: {} },
    focusSegments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FocusSegment' }]
});

module.exports = mongoose.model('DailyFocus', dailyFocusSchema);
