require('dotenv').config()
const mongoose = require('mongoose')
//const MONGODB_URI = ''
//process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db