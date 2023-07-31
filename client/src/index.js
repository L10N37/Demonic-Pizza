import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import './assets/css/style.css';

// Import CartProvider
import { CartProvider } from './contexts/CartContext';

// Instantiate the Apollo Client here
const client = new ApolloClient({
  uri: '/graphql',
});

ReactDOM.render(
  <CartProvider>
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
  </CartProvider>,
  document.getElementById('root')
);
