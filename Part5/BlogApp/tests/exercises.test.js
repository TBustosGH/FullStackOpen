const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { default: mongoose } = require('mongoose')

const api = supertest(app)


//Exercises
//4-3
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})
//4-4
describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: 'asdasdasdasd',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,36)
    })
})
//4-5
describe('Favourite blog test', () => {
    const listWithOneBlog = [
        {
            title: 'The great adventures of mr. Qwerty',
            author: 'Mr. Qwerty',
            url: 'No url given',
            likes: 55
        }
    ]

    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }  
    ]
    

    test('With just one blog', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
    })
    test('with a bigger list of blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
    test('with no blogs provided', () => {
        const result = listHelper.favouriteBlog([])
        assert.deepStrictEqual(result, undefined)
    })
})
//4-8
describe('Response must contain a especific amount of blogs in JSON format', () => {
    test('Is returning blogs in JSON format', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('Is returning two blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 2)
    })

})
//4-9
describe('Blogs must contain an "id" field and not an "_id"', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body

    test('Blogs contain an "id" field', () => {
        assert(contents.some(object => object.hasOwnProperty('id')))
    })

    test('Blogs contain an "_id" field', () => {
        assert(!contents.some(object => object.hasOwnProperty('_id')))
    })
})
//4-10
test('Can add a new valid blog', async () => {
    //Retrieve all blogs at the beggining of the test 
    const blogsAtStart = await api.get('/api/blogs')
    //Create a new blog 
    newBlog = { 
        title: 'Hola mundo',
        author: 'nobody',
        url: 'nah',
        likes: 0 
    }
    //post the new blog to the DB
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    //Retrieve all blogs after posting a new blog
    const blogsAtEnd = await api.get('/api/blogs')
    //Compare the blogs at the start of the test with te blogs at the
    //end of the test
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})
//4-11
test('Blogs without likes field will have 0 likes by default', async () => {
    //Create a new blog without likes field
    const newBlog = {
        title: "This blog doesn't have likes field",
        author: 'The Writter',
        url: 'unnecesary'
    }
    //Post the new blog to the DB
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    //Get all blogs from DB
    const response = await api.get('/api/blogs')
    const blogs = response.body
    //Get the last blog from all blogs
    const lastBlog = blogs[blogs.length - 1]
    console.log(lastBlog)
    //Make sure likes field doesn't exist in new blog
    assert(!newBlog.likes)
    //Make sure likes field is equal to zero in the last blog in DB (new blog)
    assert.deepStrictEqual(lastBlog.likes, 0)
})
//4-12
describe('DB responds with 400 bad request', () => {
    const blogWithoutTitle = {
        author: 'Carlos Villagran',
        url: 'unnecesary',
    }
    const blogWithoutUrl = {
        title: 'How to name your moustache',
        author: "Markiplier's dad"
    }
    const blogWithoutAuthor = {
        title: 'Your mom',
        url: 'Your dad'
    }
    test('If no title given', async () => {
        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })
    test('If no url given', async () => {
        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)
    })
    test('If no author given', async () => {
        await api
            .post('/api/blogs')
            .send(blogWithoutAuthor)
            .expect(400)
    })
})

after(async () =>{
    await mongoose.connection.close()
})