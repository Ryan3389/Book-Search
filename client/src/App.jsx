// src/App.jsx
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import SearchBooks from './components/SearchBooks';
// import SavedBooks from './components/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SearchBooks />
        <SavedBooks />
      </div>
    </ApolloProvider>
  );
}

export default App;


// import './App.css';
// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// export default App;
