const express =require('express')
const { sendToQueue } = require('../config/rabbitConnection')

const router = express.Router()

//sending message to the queue
router.post('/send', async(req, res) => {
    const {msg} = req.body
    if(!msg) {
        return res.status(400).json({message: "Message is required"})
    }
    sendToQueue({msg, timestamp: new Date()})
    return res.status(200).json({message: "Message sent to the queue"})
})

module.exports = router