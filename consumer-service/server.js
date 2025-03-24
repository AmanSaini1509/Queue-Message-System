require('dotenv').config()
const express = require('express')
const app = express()
const  consumeMessages = require('./workers/consumer')


//calling the consumeMessages function
consumeMessages()
console.log("🚀 Consumer Service is running...");

//SERVER
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Producer service is running on http://localhost:${PORT}`);
})