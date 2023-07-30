import { gql } from '@apollo/client';

export const GET_PIZZAS = gql`
  query {
    pizzas {
      _id
      name
      ingredients
      description
      price
      image
    }
  }
`;

export const GET_PASTAS = gql`
  query {
    pastas {
      _id
      name
      ingredients
      description
      price
      image
    }
  }
`;

export const GET_SIDES = gql`
  query {
    sides {
      _id
      name
      description
      price
      image
    }
  }
`;
