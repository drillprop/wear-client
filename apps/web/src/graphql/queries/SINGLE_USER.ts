import { gql } from "@apollo/client-v3";

export default gql`
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
