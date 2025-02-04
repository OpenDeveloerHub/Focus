const mongoose = require('mongoose');

const focusSegmentSchema = new mongoose.Schema({
    startTime: { type: Date, required: true, default: Date.now },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    projectName: { type: String, trim: true, default: "no project" }
}, { timestamps: true });

module.exports = mongoose.model('FocusSegment', focusSegmentSchema);
