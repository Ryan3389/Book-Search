const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware(req),
});

const startServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Apply the Apollo GraphQL middleware and set the path at /graphql
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Use the routes
  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the startServer function
startServer();

//MINE: OLD
// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4')
// const { authMiddleware } = require('./utils/auth')
// const path = require('path');

// const { typeDefs, resolvers } = require('./schemas')
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001
// const app = express()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// })


// const startApolloServer = async () => {
//   await server.start()
//   server.applyMiddleware({ app })

//   app.use(express.urlencoded({ extended: true }))
//   app.use(express.json())

//   app.use('/graphql', expressMiddleware(server))

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')))

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname), '../client/dist/index.html')
//     })
//   }
//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// }

// startApolloServer()


