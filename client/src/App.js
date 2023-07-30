// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  // globals (you can declare state variables here if needed)
  let totalPrice = 0;
  let orderContents = [];

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <div className="logoContainer">
            <img src={require('./assets/images/logo.png')} alt="Demonic Pizza Business Logo" id="logo-image" />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/pasta" element={<Pasta />} />
            <Route path="/sides" element={<Sides />} />
          </Routes>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
