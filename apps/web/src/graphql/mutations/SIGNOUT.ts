import { gql } from "@apollo/client-v3";

export default gql`
  mutation Signout {
    signout {
      message
    }
  }
`;
