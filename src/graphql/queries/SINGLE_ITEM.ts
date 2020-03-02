import { gql } from 'apollo-boost';

export default gql`
  query SingleItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      price
      imageUrl
      category
      gender
      createdAt
      updatedAt
      sizes {
        sizeSymbol
        quantity
      }
    }
  }
`;
