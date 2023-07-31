import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $mobile: String!, $address: AddressInput!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, mobile: $mobile, address: $address) {
            token
            user {
                _id
                firstName
                lastName
                email
                mobile
                address {
                    street
                    suburb
                    city
                    state
                    postcode
                }
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($userId: ID!) {
    createOrder(userId: $userId) {
      _id
      user {
        _id
        username
      }
      items {
        _id
        name
        quantity
        price
      }
      total
    }
  }
`;

export const ADD_ITEM_TO_ORDER = gql`
  mutation addItemToOrder($orderId: ID!, $itemId: ID!, $quantity: Int!) {
    addItemToOrder(orderId: $orderId, itemId: $itemId, quantity: $quantity) {
      _id
      items {
        _id
        name
        quantity
        price
      }
      total
    }
  }
`;

export const REMOVE_ITEM_FROM_ORDER = gql`
  mutation removeItemFromOrder($orderId: ID!, $itemId: ID!) {
    removeItemFromOrder(orderId: $orderId, itemId: $itemId) {
      _id
      items {
        _id
        name
        quantity
        price
      }
      total
    }
  }
`;

export const UPDATE_ITEM_QUANTITY = gql`
  mutation updateItemQuantity($orderId: ID!, $itemId: ID!, $quantity: Int!) {
    updateItemQuantity(orderId: $orderId, itemId: $itemId, quantity: $quantity) {
      _id
      items {
        _id
        name
        quantity
        price
      }
      total
    }
  }
`;
