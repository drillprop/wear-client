import { gql } from "@apollo/client";

export default gql`
  mutation DeleteAccount($password: String!) {
    deleteAccount(password: $password) {
      message
    }
  }
`;
