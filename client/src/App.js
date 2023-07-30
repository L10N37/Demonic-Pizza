// install ES7+ extension , use 'RAFCE'
// props input passed to the component, similar to function arguments, immutable 
// state, data manged by a component, similar to local variables, mutable

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';

import Pizza from './pages/Pizza';
import Pasta from './pages/Pasta';
import Sides from './pages/Sides';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

//globals
let totalPrice = 0;
let orderContents = [];


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/pasta" element={<Pasta />} />
            <Route path="/sides" element={<Sides />} />
            {/* Other routes as necessary */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;