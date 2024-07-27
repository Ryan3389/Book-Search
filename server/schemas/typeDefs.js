const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      authors: [String]
      description: String!
      title: String!
      image: String
      link: String
    ): User
    removeBook(bookId: String!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;

// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
// type Book {
//     bookId: String
//     authors: [String]
//     description: String!
//     title: String!
//     image: String
//     link: String
//   }

//   type User {
//     _id: ID!
//     username: String!
//     email: String!
//     bookCount: Int
//     savedBooks: [Book]
//   }
  
//     type Auth {
//       token: ID!  
//       user: User!
//     }

//   input BookInput {
//     bookId: String!
//     authors: [String]!
//     description: String!
//     title: String!
//     image: String
//     link: String
//   }


//   type Query {
//     me: User
//   }

//   type Mutation {
//     login(username: String, password: String!): Auth
//     createUser(username: String!, email: String!): Auth
//     savedBook(book: BookInput!): User
//     deleteBook(bookId: String!): User
//   }
// `;

// module.exports = typeDefs;


/*
createUser(username: String!, email: String, savedBooks: [title: String, description: String, [authors]: string]): User

    login(username: String! email: String): User

    savedBook(title: String, description: String, [authors]: String): Book

    deleteBook(title: String, description: String, [authors]: String): Book

*/