import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      id
      email
      password
      firstName
      lastName
      address
      phoneNumber
      role
      createdAt
      updatedAt
      resetToken
      resetTokenExpiry
    }
  }
`;
