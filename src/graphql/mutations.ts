import { gql } from 'apollo-boost';

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      token
      id
      email
      password
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      id
      email
      password
      firstName
      lastName
    }
  }
`;
