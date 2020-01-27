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

export const UPDATE_PERSONAL_INFO = gql`
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

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $password: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    changePassword(
      password: $password
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`;

export const SUBSCRIBE_TO_NEWSLETTER = gql`
  mutation SubscribeToNewsletter($newsletter: Boolean!) {
    subscribeToNewsletter(newsletter: $newsletter) {
      message
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($password: String!) {
    deleteAccount(password: $password) {
      message
    }
  }
`;
