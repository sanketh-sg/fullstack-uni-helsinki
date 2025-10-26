const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')
const { requestLogger } = require('../utils/middleware')
const logger = require('../utils/logger')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {

  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })

  const notes = await Note.find({}).populate('user',{ username: 1, name: 1 })
  // console.log('notes', notes)
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
  try {
    const note = await Note.findById(request.params.id).catch(error => next(error))
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }

})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  // console.log(request)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  // console.log(user)
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }
  logger.info('user:', user)
  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  })

  // note.save()
  //   .then(savedNote => {
  //     response.json(savedNote)
  //   })
  //   .catch(error => next(error))

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    // logger.info('saved note:', savedNote)
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {

  // Note.findByIdAndDelete(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))

  try{
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }

})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


module.exports = notesRouter