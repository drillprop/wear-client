import { gql } from "@apollo/client";

export default gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      message
    }
  }
`;
