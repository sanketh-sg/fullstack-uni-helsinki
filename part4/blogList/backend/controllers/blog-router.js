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

blogRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  Blog
    .findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'blog not found' })
      }
    })
    .catch(error => {
      logger.error('Error deleting blog:', error.message)
      response.status(500).json({ error: 'internal server error' })
    })
})

blogRouter.put('/:id', (request, response) => {
  const id = request.params.id  
  const body = request.body
  Blog.findById(id)
    .then(blog => {
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }
      blog.title = body.title 
      blog.author = body.author 
      blog.url = body.url 
      blog.likes = body.likes

      return blog.save()
    })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => {
      logger.error('Error updating blog:', error.message)
      response.status(500).json({ error: 'internal server error' })
    })
})



  module.exports = blogRouter
