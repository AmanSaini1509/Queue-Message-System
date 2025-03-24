require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connection = require('./config/database')
const monitoringRoutes = require('./routes/monitoring.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connection();

// Routes
app.use('/api/monitor', monitoringRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
    console.log(`Monitoring service is running at http://localhost:${PORT}`);
});