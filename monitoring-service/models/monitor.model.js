const mongoose = require('mongoose');

const MonitorSchema = new mongoose.Schema({
    totalMessages: {
        type: Number,
        default: 0
    },
    processedMessages: {
        type: Number,
        default: 0
    },
    failedMessages: {
        type: Number,
        default: 0
    },
    workerHealth: {
        type: Object,
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Monitoring', MonitorSchema);