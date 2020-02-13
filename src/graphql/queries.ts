import { gql } from 'apollo-boost';

export const SINGLE_ITEM = gql`
  query SingleItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      price
      imageUrl
      category
      gender
      createdAt
      updatedAt
    }
  }
`;

export const SINGLE_USER = gql`
  query SingleUser($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdAt
      updatedAt
      newsletter
      address {
        addressLine1
        addressLine2
        zipCode
        city
        country
      }
      createdOrders {
        id
      }
    }
  }
`;
