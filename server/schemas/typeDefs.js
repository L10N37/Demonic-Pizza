const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pizza {
    _id: ID!
    name: String!
    ingredients: [String]!
    description: String!
    price: Float!
  }

  type Pasta {
    _id: ID!
    name: String!
    ingredients: [String]!
    description: String!
    price: Float!
  }

  type Side {
    _id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: Address!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
    country: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    pizzas: [Pizza]
    pizza(_id: ID!): Pizza
    pastas: [Pasta]
    pasta(_id: ID!): Pasta
    sides: [Side]
    side(_id: ID!): Side
    me: User
  }

  type Mutation {
    createPizza(name: String!, ingredients: [String]!, description: String!, price: Float!): Pizza
    createPasta(name: String!, ingredients: [String]!, description: String!, price: Float!): Pasta
    createSide(name: String!, description: String!, price: Float!): Side
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, address: AddressInput): Auth
    login(email: String!, password: String!): Auth
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
    country: String!
  }
`;

module.exports = typeDefs;
