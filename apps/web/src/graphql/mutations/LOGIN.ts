import { gql } from "@apollo/client-v3";

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      email
      firstName
      lastName
    }
  }
`;
