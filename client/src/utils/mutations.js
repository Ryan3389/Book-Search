// src/utils/mutations.js
import { gql } from '@apollo/client';

export const SEARCH_BOOKS = gql`
  mutation searchBooks($query: String!) {
    searchBooks(query: $query) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $title: String!
    $authors: [String]!
    $description: String!
    $image: String
    $link: String
  ) {
    saveBook(
      bookId: $bookId
      title: $title
      authors: $authors
      description: $description
      image: $image
      link: $link
    ) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// import { gql } from '@apollo/client';

// export const LOGIN_USER = gql`
//     mutation login($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//             token
//             user {
//                 _id
//                 username
//             }
//         }
//     }

// `
// export const ADD_USER = gql`
//     mutation createUser($username: String!, $email: String!, $password: String)
//         createUser(username: $username, email: $email, password: $password) {
//         token
//         user {
//             _id
//             username
//             email
//             savedBooks {
//               authors
//               description
//               bookId
//               image
//               link
//               title
//             }
//         }
//         }
// `

// export const SAVE_BOOK = gql`
//     mutation savedBook($newBook: BookInput)
//         savedBook(newBook: $newBook) {
//             _id
//             username
//             email 
//             savedBooks {
//                 authors
//                 description
//                 bookId
//                 image
//                 link
//                 title
//             }
//         }

// `

// export const REMOVE_BOOK = gql`
//     mutation deleteBook($bookId: ID!)
//         deleteBook(bookId: $bookId){
//         _id
//         username
//         email
//         savedBooks {
//             authors
//             description
//             bookId
//             image
//             link
//             title
//         }
//         }
// `