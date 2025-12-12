const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    if(!blog.title)
        response.status(400).json({ error: 'No title given' })
    else if (!blog.author)
        response.status(400).json({ error: 'No author given' })
    else if (!blog.url)
        response.status(400).json({ error: 'No url given' })

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})


module.exports = blogsRouter