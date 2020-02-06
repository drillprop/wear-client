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

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress(
    $addressLine1: String
    $addressLine2: String
    $zipCode: String
    $city: String
    $country: String
  ) {
    updateAddress(
      input: {
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        zipCode: $zipCode
        city: $city
        country: $country
      }
    ) {
      message
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $name: String!
    $price: Float!
    $imageUrl: String!
    $largeImageUrl: String!
    $category: Category!
    $gender: Gender!
    $description: String
  ) {
    createItem(
      input: {
        name: $name
        price: $price
        imageUrl: $imageUrl
        largeImageUrl: $largeImageUrl
        category: $category
        gender: $gender
        description: $description
      }
    ) {
      id
      name
      price
      imageUrl
      largeImageUrl
      category
      gender
      createdAt
    }
  }
`;
