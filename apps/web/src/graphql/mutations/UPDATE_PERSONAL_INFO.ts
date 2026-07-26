import { gql } from "@apollo/client";

export default gql`
  mutation UpdatePersonalInfo(
    $firstName: String
    $lastName: String
    $phoneNumber: String
  ) {
    updatePersonalInfo(
      input: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      message
    }
  }
`;
