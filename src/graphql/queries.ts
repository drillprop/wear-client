import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdAt
      updatedAt
      resetToken
      resetTokenExpiry
      newsletter
      address {
        addressLine1
        addressLine2
        zipCode
        city
        country
      }
    }
  }
`;

export const USERS = gql`
  query Users(
    $whereId: ID
    $take: Int
    $skip: Int
    $orderBy: String
    $desc: Boolean
    $whereRole: UserRole
    $whereEmail: String
    $whereFirstName: String
    $whereLastName: String
  ) {
    users(
      input: {
        whereId: $whereId
        take: $take
        skip: $skip
        orderBy: $orderBy
        desc: $desc
        whereRole: $whereRole
        whereEmail: $whereEmail
        whereFirstName: $whereFirstName
        whereLastName: $whereLastName
      }
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdOrders {
        id
      }
    }
  }
`;

export const USERS_COUNT = gql`
  query UsersCount {
    usersCount
  }
`;

export const ITEMS = gql`
  query Items(
    $whereId: ID
    $take: Int
    $skip: Int
    $orderBy: String
    $desc: Boolean
    $priceFrom: Float
    $priceTo: Float
    $whereName: String
    $whereCategory: Category
    $whereGender: Gender
  ) {
    items(
      input: {
        whereId: $whereId
        take: $take
        skip: $skip
        orderBy: $orderBy
        desc: $desc
        priceFrom: $priceFrom
        priceTo: $priceTo
        whereName: $whereName
        whereCategory: $whereCategory
        whereGender: $whereGender
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
      updatedAt
    }
  }
`;

export const ITEMS_COUNT = gql`
  query ItemsCount {
    itemsCount
  }
`;

export const SINGLE_ITEM = gql`
  query SingleItem($id: ID!) {
    item(id: $id) {
      id
      name
      price
      imageUrl
      largeImageUrl
      category
      gender
      createdAt
      updatedAt
    }
  }
`;
