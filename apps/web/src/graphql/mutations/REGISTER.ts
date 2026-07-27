import { gql } from "@apollo/client-v3";

export default gql`
  mutation Register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      id
      email
      firstName
      lastName
    }
  }
`;
