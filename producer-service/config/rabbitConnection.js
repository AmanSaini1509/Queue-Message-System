const amqp = require('amqplib')

let channel, connection
const connection_URL = process.env.RABBITMQ_URL || "amqp://localhost"
const queueName = "task_queue1"

//connecting to RabbitMQ
const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(connection_URL)
        channel = await connection.createChannel()
        await channel.assertQueue(queueName, { durable: true })
        console.log("Connected to RabbitMQ and created a queue");
    }
    catch(error) {
        console.error("Error conncecting to RabbitMQ", error);
    }
}

//publishing message to RabbitMQ
const sendToQueue = async(message) => {
    if(!channel) {
        return console.error("Channel is not created");
    }
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),
    { persistent: true})
    console.log("Message sent to the queue");
}
//closing the connection
process.on("exit", () => {
    if(connection) {
        connection.close()
        console.log("Closing RabbitMQ connection");
    }
})

module.exports = { connectRabbitMQ, sendToQueue }