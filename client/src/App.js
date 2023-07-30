import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Pizza from './pages/Pizza';
import Pasta from './pages/Pasta';
import Sides from './pages/Sides';
import Cart from './pages/Cart'; // Import the Cart component

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="logoContainer">
        <img src={require('./assets/images/logo.png')} alt="Demonic Pizza Business Logo" id="logo-image" />
      </div>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/pasta" element={<Pasta />} />
            <Route path="/sides" element={<Sides />} />
            {/* Add the route for the Cart component */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
