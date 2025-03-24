require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Consumer service connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = connectDB