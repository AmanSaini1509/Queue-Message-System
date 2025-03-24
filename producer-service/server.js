require('dotenv').config()
const app = require('./app')
const { connectRabbitMQ } = require('./config/rabbitConnection')

//starting the RabbitMQ connection
connectRabbitMQ()

//SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Producer service is running on http://localhost:${PORT}`);
})