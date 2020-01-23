import { gql } from 'apollo-boost';

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const SIGNOUT = gql`
  mutation Signout {
    signout {
      message
    }
  }
`;

export const UPDATE_CONTACT_DETAILS = gql`
  mutation UpdateContactDetails(
    $firstName: String
    $lastName: String
    $address: String
    $phoneNumber: Int
  ) {
    updateContactDetails(
      input: {
        firstName: $firstName
        lastName: $lastName
        address: $address
        phoneNumber: $phoneNumber
      }
    ) {
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword) {
      message
    }
  }
`;
