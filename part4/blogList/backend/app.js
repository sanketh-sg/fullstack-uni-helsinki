const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog-router')
const userRouter = require('./controllers/user-router')
const loginRouter = require('./controllers/login-router')   

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
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/blogs',middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
