import { gql } from "@apollo/client-v3";

export default gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      message
    }
  }
`;
