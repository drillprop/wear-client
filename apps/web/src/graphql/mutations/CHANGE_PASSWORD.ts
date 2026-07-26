import { gql } from "@apollo/client";

export default gql`
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
