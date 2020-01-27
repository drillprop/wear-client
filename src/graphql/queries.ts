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
        addresLine1
        addresLine2
        zipCode
        city
        country
      }
    }
  }
`;
