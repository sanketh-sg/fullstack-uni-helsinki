const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/info', (request, response) => {
    const date = new Date()
    return response.send(date.toString())
})

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
    // const body = request.body
    // logger.info('body', body)

    const blog = new Blog(request.body)
    if (!blog.title || !blog.url || blog.title === '' || blog.url === '') {
      return response.status(400).json({ error: 'title or url missing' })
    }
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogRouter
