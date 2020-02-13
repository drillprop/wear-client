import { gql } from 'apollo-boost';

export default gql`
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
