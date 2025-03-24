require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected Monitoring database");
        
    } catch(error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = connection;