const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog-router')

const mongoUrl = config.MONGODB_URI
console.log('connecting to MongoDB')
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
