const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pizza {
    _id: ID!
    name: String!
    ingredients: [String]!
    description: String!
    price: Float!
    image: String!
  }

  type Pasta {
    _id: ID!
    name: String!
    ingredients: [String]!
    description: String!
    price: Float!
    image: String!
  }

  type Side {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    type: String!
  }

  type Extra {
    _id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Crust {
    _id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Order {
    _id: ID!
    userId: ID!
    items: [OrderItem]
  }

  type OrderItem {
    _id: ID!
    quantity: Int!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    address: Address!
    orders: [Order]
  }

  type Address {
    street: String!
    suburb: String!
    city: String!
    state: String!
    postcode: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    pizzas: [Pizza]
    pizza(_id: ID!): Pizza
    extras: [Extra]
    extra(_id: ID!): Extra
    crusts: [Crust]
    crust(_id: ID!): Crust
    pastas: [Pasta]
    pasta(_id: ID!): Pasta
    sides: [Side]
    side(_id: ID!): Side
    me: User
  }

  type Mutation {
    createPizza(name: String!, ingredients: [String]!, description: String!, price: Float!): Pizza
    createPasta(name: String!, ingredients: [String]!, description: String!, price: Float!): Pasta
    createSide(name: String!, description: String!, price: Float!, type: String!): Side
    createExtra(name: String!, description: String!, price: Float!): Extra
    createCrust(name: String!, description: String!, price: Float!): Crust
    addUser(firstName: String!, lastName: String!, email: String!, mobile: String!, password: String!, address: AddressInput!): Auth
    login(email: String!, password: String!): Auth
    createOrder(userId: ID!): Order
    addItemToOrder(orderId: ID!, itemId: ID!, quantity: Int!): Order
    removeItemFromOrder(orderId: ID!, itemId: ID!): Order
    updateItemQuantity(orderId: ID!, itemId: ID!, quantity: Int!): Order
  }

  input AddressInput {
    street: String!
    suburb: String!
    city: String!
    state: String!
    postcode: String!
  }
`;

module.exports = typeDefs;
