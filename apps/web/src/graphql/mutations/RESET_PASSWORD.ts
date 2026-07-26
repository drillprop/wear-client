import { gql } from "@apollo/client";

export default gql`
  mutation ResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;
