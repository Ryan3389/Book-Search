const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input BookInput {
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
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
    user(id: ID, username: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, savedBooks: [BookInput]): Auth
    login(username: String, email: String, password: String!): Auth
    savedBook(userId: ID!, book: BookInput!): User
    deleteBook(userId: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;


/*
createUser(username: String!, email: String, savedBooks: [title: String, description: String, [authors]: string]): User

    login(username: String! email: String): User

    savedBook(title: String, description: String, [authors]: String): Book

    deleteBook(title: String, description: String, [authors]: String): Book

*/