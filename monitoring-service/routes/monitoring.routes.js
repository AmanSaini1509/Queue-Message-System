const {getMontior, updateMonitor} = require('../controllers/monitoring.controller');
const express = require('express');
const router = express.Router();

// GET /monitoring
router.get('/stats', getMontior);
router.post('/stats', updateMonitor);

module.exports = router;

