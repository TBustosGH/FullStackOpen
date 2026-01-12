const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


//API ROUTES

blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({}).populate('author', { username: 1, name: 1, id: 1 })
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id).populate('author')
        .then(blog => {
            response.json(blog)
        })
        .catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user
    if(!user) {
        return response.status(400).json({ error: 'invalid token' })
    }

    if(!body.title)
        response.status(400).json({ error: 'No title given' })

    const blog = new Blog({
        title: body.title,
        author: user.id,
        url: body.url || 'No url given',
        likes: body.likes || 0
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    //blog to delete info
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    if (!blog) {
        return response.status(400).json({ error: 'blog not found' })
    }
    //authorization info
    const user = request.user   //`request.user` id defined in a middleware
    if(!user) {
        return response.status(400).json({ error: 'invalid token' })
    }

    //Delete operation
    if(blog.author.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(blogId)
        response.status(204).end()
    } else {
        response.status(400).json({ error: 'Blog must be yours to delete' })
    }
})
blogsRouter.put('/:id', async (request, response, next) => {
    //blog to update info
    const  blogId = request.params.id
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: body.id
    }

    //update operation
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true, runValidators: true })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter