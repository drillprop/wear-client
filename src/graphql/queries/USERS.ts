import { gql } from 'apollo-boost';

export default gql`
  query Users(
    $id: ID
    $take: Int
    $skip: Int
    $sortBy: String
    $desc: Boolean
    $role: UserRole
    $email: String
    $firstName: String
    $lastName: String
  ) {
    users(
      where: {
        id: $id
        take: $take
        skip: $skip
        sortBy: $sortBy
        desc: $desc
        role: $role
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      count
      select {
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
  }
`;
