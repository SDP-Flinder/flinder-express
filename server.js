const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const path = require("path")
const http = require("http")
require('dotenv').config()

// Import Routers
const userRouter = require('./routes/user-router')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// Set up DB
//db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Use Routers
app.use('/user', userRouter)

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))