const Monitoring = require('../models/monitor.model');

const getMontior = async (req, res) => {
    try {
        const stats = await Monitoring.findOne().sort({ lastUpdated: -1 });
        if (!stats) {
            return res.status(404).json({ message: "No monitoring status" });
        }
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to receive monitoring data from services
const updateMonitor = async (req, res) => {
    try {
        const { success, workerId } = req.body;

        if (typeof success !== 'boolean' || !workerId) {
            return res.status(400).json({ message: "Invalid data format" });
        }

        // Find or create monitoring document
        let stats = await Monitoring.findOne();
        if (!stats) {
            stats = await Monitoring.create({
                totalMessages: 0,
                processedMessages: 0,
                failedMessages: 0,
                workerHealth: {},
                lastUpdated: new Date(),
            });
        }

        // Update counters
        const updateFields = {
            totalMessages: stats.totalMessages + 1,
            processedMessages: success ? stats.processedMessages + 1 : stats.processedMessages,
            failedMessages: success ? stats.failedMessages : stats.failedMessages + 1,
            [`workerHealth.${workerId}`]: success ? "Healthy" : "Failed",
            lastUpdated: new Date(),
        };

        stats = await Monitoring.findOneAndUpdate({}, { $set: updateFields }, { new: true });

        res.status(200).json({ message: "Monitoring data updated", stats });
    } catch (error) {
        console.error("Error updating monitoring data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getMontior, updateMonitor };
