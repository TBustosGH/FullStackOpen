//GRAPHQL & APOLLOSERVER
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')
//MONGOOSE & JWT
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.set('strictPopulate', false)
const jwt = require('jsonwebtoken')
//MODELS
const User = require('./models/User.js')
const Author = require('./models/Author.js')
const Book = require('./models/Book.js')
//DOTENV
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error! connectioto MongoDB failed \n ', error.message)
    })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    { 
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },  
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]



const typeDefs = `
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }
    
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String
    }

    type Query {
        authorCount: Int!
        allAuthors: [Author!]!
        findAuthor(name: String!): Author!
        bookCount: Int!
        allBooks(author: String, genres: [String]): [Book!]!
        findBook(title: String!): Book!
        me: User
    }

    type Mutation {
        addAuthor(
            name: String!
            born: String
        ): Author
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        createUser(
            username: String!
            favouriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}),
        findAuthor: (root, args) => Author.findOne({ name: args.name }), 
        bookCount: async () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.genres) {
                return await Book.find({}).populate('Author')
            }
            return await Book.find({ genres: { $all: args.genres } }).populate('Author')
        },
        findBook: (root, args) => Book.findOne({ title: args.title }),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addAuthor: async (root, args, context) => {
            const newAuthor = new Author({
                ...args,
                id: uuid()
            })

            if (!context.currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            
            try {
                if (!(newAuthor.name.length < 4)) {
                    await newAuthor.save()
                    return newAuthor
                }
                throw new GraphQLError('Author`s name too short! must be at least 4 digits long')
            } catch (error) {
                return new GraphQLError('Error trying to save new author', {
                    extensions: {
                        invalidArgs: args,
                        error
                    }
                })
            }
            
        },
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            const newBook = new Book({
                ...args,
                id: uuid(),
                author: author._id
            })

            if (!context.currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            try {
                if (!(newBook.title.length < 5)) {
                    await newBook.save()
                    return { ...newBook._doc, author: author, id: newBook._id}
                }
                throw new GraphQLError('Book`s name too short! must be at least 5 digits long')
            } catch (error) {
                return new GraphQLError('Error trying to save new book', {
                    extensions: {
                        invalidArgs: args,
                        error
                    }
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre
            })

            try {
                if (!(user.username.length < 3)) {
                    await user.save()
                    return user
                }
                throw new GraphQLError('username`s too short! must be at least 3 digits long', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username
                    }
                })
            } catch (error) {
                throw new GraphQLError('Fail while creating a new user', {
                    extensions: {
                        invalidArgs: args,
                        error
                    }
                })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})