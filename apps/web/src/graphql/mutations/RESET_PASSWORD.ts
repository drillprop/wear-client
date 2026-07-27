import { gql } from "@apollo/client-v3";

export default gql`
  mutation ResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;
