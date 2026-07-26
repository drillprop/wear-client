import { gql } from "@apollo/client";

export default gql`
  query ME {
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
