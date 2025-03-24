require('dotenv').config()
const amqp = require('amqplib')
const Message = require('../models/message.model')
const connectDB = require('../config/databaseConn')
const axios = require('axios')

const queueName = "task_queue1"

//updating the monitoring service
const updateMnoitorData = async (success = true) => {
    const url = process.env.MONITORING_URL || "http://localhost:4003/api/monitor/stats"
    const updateData = {
        success,
        workerId: "worker_1"
    }
    try{
        //send data to Monitoring service
        await axios.post(url, updateData);
    } catch (error) {
        console.error("Error updating monitoring data: ", error);
    }
}

//consume messages from the queue
//this function will be called by the worker
const consumeMessages = async () => {
    await connectDB()
    const connectRabbitMQ = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connectRabbitMQ.createChannel()

    await channel.assertQueue(queueName, { durable: true })
    console.log(`listening to the queue: ${queueName}`);

    channel.consume(queueName, async (msg) => {
       try {
        const messageContent = JSON.parse(msg.content.toString())
        console.log("Message received: ", messageContent)
        
        //simulating processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        //saving the message to the database
        await Message.create(messageContent)
        console.log("Message processed and saved");
        
        //acknowledging the message
        channel.ack(msg)

        //updating the monitoring service
        await updateMnoitorData(true)
    } catch (error) {
        console.error("Error processing message: ", error);
        //acknowledging the message
        channel.nack(msg, false, true);
        //updating the monitoring service
        await updateMnoitorData(false)
    }
    })
}

module.exports = consumeMessages