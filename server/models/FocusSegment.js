const mongoose = require('mongoose');

const focusSegmentSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    projectName: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('FocusSegment', focusSegmentSchema);