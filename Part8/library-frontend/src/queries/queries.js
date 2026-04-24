import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
        }
    }
`
export const EDIT_AUTHOR_BIRTHDAY = gql`
    mutation editAuthorBorn(
        $name: String!,
        $setBornTo: Int!
    ) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            id
        }
    }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
                id
            }
            id
            genres
        }
    }
`
export const ADD_BOOK = gql`
    mutation createBook(
        $title: String!,
        $author: String!,
        $published: Int!,
        $genres: [String!]!
    ) {
        addBook (
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
            id: 1
        ) {
            title
            author
            published
            genres
            id
        }
    }
`
export const LOGIN = gql`
    mutation LOGIN (
        $username: String!
        $password: String!
    ) {
        login (
            username: $username,
            password: $password
        ) {
            value
        }
    }
`
