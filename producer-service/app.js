const express = require('express')
const cors = require('cors')
const queueRoute = require('./routes/queue.route')

const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use('/queue', queueRoute)

module.exports = app