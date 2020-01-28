import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdAt
      updatedAt
      resetToken
      resetTokenExpiry
      newsletter
      address {
        addressLine1
        addressLine2
        zipCode
        city
        country
      }
    }
  }
`;

export const USERS = gql`
  query Users(
    $whereId: ID
    $take: Int
    $skip: Int
    $orderBy: String
    $desc: Boolean
    $whereRole: UserRole
    $whereEmail: String
    $whereFirstName: String
    $whereLastName: String
  ) {
    users(
      input: {
        whereId: $whereId
        take: $take
        skip: $skip
        orderBy: $orderBy
        desc: $desc
        whereRole: $whereRole
        whereEmail: $whereEmail
        whereFirstName: $whereFirstName
        whereLastName: $whereLastName
      }
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdOrders {
        id
      }
    }
  }
`;
