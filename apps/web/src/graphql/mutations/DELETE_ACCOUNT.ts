import { gql } from "@apollo/client-v3";

export default gql`
  mutation DeleteAccount($password: String!) {
    deleteAccount(password: $password) {
      message
    }
  }
`;
