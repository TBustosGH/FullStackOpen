//GRAPHQL & APOLLOSERVER
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')
//MONGODB & MONGOOSE
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Person = require('./models/person')
//DOTENV
require('dotenv').config()
//GET MONGODB URL from dotenv
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)
//CONNECT TO MONGODB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB ', error.message)
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
        author: String!
        id: ID!
        genres: [String!]!
    }

    type Query {
        authorCount: Int!
        allAuthors: [Author!]!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
    }

    type Mutation {
        addAuthor(
            name: String!
            born: String
            id: ID!
        ): Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
            id: ID!
        ): Book
    }
`

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (rot, args) => {
            if (!args.phone) {
                return Person.find({})
            }

            return Person.find({ phone: { $exists: args.phone === 'YES' } })
        },
        findPerson: async (root, args) => Person.findOne({ name: args.name })
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Mutation: {
        addPerson: async (root, args) => {
            const person = new Person({ ...args })

            try {
                await person.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                }) 
            }
            return person
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone

            try {
                await person.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return person
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})