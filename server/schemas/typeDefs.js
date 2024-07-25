const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: String!  
    user: User!
  }

  type Query {
  me: User
    user(id: ID, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!): Auth
    login(username: String, password: String!): Auth
    savedBook(book: BookInput!): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;


/*
createUser(username: String!, email: String, savedBooks: [title: String, description: String, [authors]: string]): User

    login(username: String! email: String): User

    savedBook(title: String, description: String, [authors]: String): Book

    deleteBook(title: String, description: String, [authors]: String): Book

*/