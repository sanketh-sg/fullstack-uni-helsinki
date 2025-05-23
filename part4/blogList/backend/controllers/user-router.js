const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
});

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3 || username.length < 3) {
        return response.status(400).json({
            error: 'username and password must be at least 3 characters long'
        })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter
