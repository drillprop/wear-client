import { gql } from 'apollo-boost';

export default gql`
  mutation CreateItem(
    $name: String!
    $price: Float!
    $imageUrl: String!
    $category: Category!
    $gender: Gender!
    $description: String
    $XS: Int!
    $S: Int!
    $M: Int!
    $L: Int!
    $XL: Int!
    $XXL: Int!
  ) {
    createItem(
      input: {
        name: $name
        price: $price
        imageUrl: $imageUrl
        category: $category
        gender: $gender
        description: $description
        sizes: [
          { sizeSymbol: XS, quantity: $XS }
          { sizeSymbol: S, quantity: $S }
          { sizeSymbol: M, quantity: $M }
          { sizeSymbol: L, quantity: $L }
          { sizeSymbol: XL, quantity: $XL }
          { sizeSymbol: XXL, quantity: $XXL }
        ]
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
