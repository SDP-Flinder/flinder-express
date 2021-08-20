require('dotenv').config()
const mongoose = require('mongoose')
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yqn5t.mongodb.net/flinder?retryWrites=true&w=majority`
//process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db