import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Pizza from './pages/Pizza';
import Pasta from './pages/Pasta';
import Sides from './pages/Sides';
import Checkout from './pages/Checkout';
import { StoreProvider } from './contexts/CartContext';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
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
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
