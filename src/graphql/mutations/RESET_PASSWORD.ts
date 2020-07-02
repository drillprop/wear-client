import { gql } from 'apollo-boost';

export default gql`
  mutation ResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;
