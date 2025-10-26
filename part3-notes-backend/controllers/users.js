const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes',{ content:1,important:1 })
  res.json(users)
})

userRouter.post('/',async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const hashPwd = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash: hashPwd
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter