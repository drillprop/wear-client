import { gql } from 'apollo-boost';

export default gql`
  mutation Signout {
    signout {
      message
    }
  }
`;
