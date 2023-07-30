import { gql } from '@apollo/client';

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
