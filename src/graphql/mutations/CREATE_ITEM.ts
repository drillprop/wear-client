import { gql } from 'apollo-boost';

export default gql`
  mutation CreateItem(
    $name: String!
    $price: Float!
    $imageUrl: String!
    $category: Category!
    $gender: Gender!
    $description: String
    $sizes: [ItemSizesInput!]
  ) {
    createItem(
      input: {
        name: $name
        price: $price
        imageUrl: $imageUrl
        category: $category
        gender: $gender
        description: $description
        sizes: $sizes
      }
    ) {
      id
      name
      price
      imageUrl
      category
      gender
      createdAt
      sizes {
        sizeSymbol
        quantity
      }
    }
  }
`;
