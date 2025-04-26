const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')  
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.replace('bearer ', '')
//   } 
//   return null
// }


blogRouter.get('/info', async (request, response) => {
    const date = new Date()
    return response.send(date.toString())
})

blogRouter.get('/', async (request, response) => {
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })

    try{
      const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      if (blogs) {
        response.json(blogs)
      } else {
        response.status(404).json({ error: 'blogs not found' })
      }
    } catch (error) {
      logger.error('Error fetching blogs:', error.message)
      response.status(500).json({ error: 'internal server error' })
    }
  })
  
blogRouter.post('/', async (request, response) => {
  // const body = request.body
  // logger.info('body', body)

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // const user =  await User.findById(decodedToken.id)
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }  
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.url || blog.title === '' || blog.url === '') {
    return response.status(400).json({ error: 'title or url missing' })
  }

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    logger.error('Error saving blog:', error.message)
    response.status(500).json({ error: 'internal server error' })
  }

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

blogRouter.delete('/:id', async (request, response) => {
  // const id = request.params.id
  // Blog
  //   .findByIdAndDelete(id)
  //   .then(result => {
  //     if (result) {
  //       response.status(204).end()
  //     } else {
  //       response.status(404).json({ error: 'blog not found' })
  //     }
  //   })
  //   .catch(error => {
  //     logger.error('Error deleting blog:', error.message)
  //     response.status(500).json({ error: 'internal server error' })
  //   })

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // const user = await User.findById(decodedToken.id)
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }
  if( user._id.toString() !== request.params.id) {
    return response.status(401).json({ error: 'user not authorized to delete this blog' })
  }
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    logger.error('Error deleting blog:', error.message)
    response.status(500).json({ error: 'internal server error' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id  
  const body = request.body
  // Blog.findById(id)
  //   .then(blog => {
  //     if (!blog) {
  //       return response.status(404).json({ error: 'blog not found' })
  //     }
  //     blog.title = body.title 
  //     blog.author = body.author 
  //     blog.url = body.url 
  //     blog.likes = body.likes

  //     return blog.save()
  //   })
  //   .then(updatedBlog => {
  //     response.json(updatedBlog.toJSON())
  //   })
  //   .catch(error => {
  //     logger.error('Error updating blog:', error.message)
  //     response.status(500).json({ error: 'internal server error' })
  //   })

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    if (!updatedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    response.json(updatedBlog.toJSON())
  } catch (error) {
    logger.error('Error updating blog:', error.message)
    response.status(500).json({ error: 'internal server error' })
  }
})


module.exports = blogRouter
