import { gql } from "@apollo/client-v3";

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
