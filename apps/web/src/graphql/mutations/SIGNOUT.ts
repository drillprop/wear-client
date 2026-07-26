import { gql } from "@apollo/client";

export default gql`
  mutation Signout {
    signout {
      message
    }
  }
`;
