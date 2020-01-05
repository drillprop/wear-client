import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      token
      id
      email
      firstName
      lastName
    }
  }
`;
