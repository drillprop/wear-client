import { gql } from 'apollo-boost';

export default gql`
  mutation CreateItem(
    $name: String!
    $price: Float!
    $imageUrl: String!
    $category: Category!
    $gender: Gender!
    $description: String
    $xs: Int
    $s: Int
    $m: Int
    $l: Int
    $xl: Int
    $xxl: Int
  ) {
    createItem(
      input: {
        name: $name
        price: $price
        imageUrl: $imageUrl
        category: $category
        gender: $gender
        description: $description
        sizes: { xs: $xs, s: $s, m: $m, l: $l, xl: $xl, xxl: $xxl }
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
        xs
        s
        m
        l
        xl
        xxl
      }
    }
  }
`;
