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

  type Query {
    pizzas: [Pizza]
    pizza(_id: ID!): Pizza
    pastas: [Pasta]
    pasta(_id: ID!): Pasta
    sides: [Side]
    side(_id: ID!): Side
  }

  type Mutation {
    createPizza(name: String!, ingredients: [String]!, description: String!, price: Float!): Pizza
    createPasta(name: String!, ingredients: [String]!, description: String!, price: Float!): Pasta
    createSide(name: String!, description: String!, price: Float!): Side
  }
`;

module.exports = typeDefs;
