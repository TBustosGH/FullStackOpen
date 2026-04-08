const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')

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
        authorCount: () => authors.length,
        allAuthors: () => authors,
        bookCount: () => books.length,
        allBooks: (root, args) =>{
            if (!args.author && !args.genre) {
                return books
            }
            else if (!args.genre) {
                return books.filter(n => n.author === args.author)
            }
            else if (!args.author) {
                return books.filter(n => n.genres.find(g => g === args.genre))
            }
            return books.filter(n => n.author === args.author && n.genres.find(g => g === args.genre))
        } 
    },
    Author: {
        bookCount: (root) => {
            const booksByAuthor = books.filter(n => n.author === root.name)
            return booksByAuthor.length
        }
    },
    Mutation: {
        addAuthor: (root, args) => {
            if (authors.find(a => a.name === args.name)) {
                throw new GraphQLError('Author already exist in DB!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invlidArgs: args.name
                    }
                })
            }
            const author = { ...args, id: uuid() }
            authors = authors.concat(author)
            return author
        },
        editAuthor: (root, args) => {
            if (!authors.find(a => a.name === args.name)) {
                throw new GraphQLError('Couldn`t find author to edit!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                }) 
            }

            const updatedAuthors = authors.map(a => a.name === args.name ? { ...a, born: args.setBornTo} : a)
            console.log(updatedAuthors)
            authors = updatedAuthors
            const updatedAuthor = authors.find(a => a.name === args.name)
            return updatedAuthor
        },
        addBook: (root, args) => {
            if (!authors.find(a => a.name === args.author)) {
                const author = { name: args.author, id: uuid() }
                authors = authors.concat(author)
            }
            const newBook = { ...args, id: uuid() }
            books = books.concat(newBook)
            return newBook
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