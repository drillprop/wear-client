import { gql } from 'apollo-boost';

export default gql`
  query Items(
    $id: ID
    $take: Int
    $skip: Int
    $sortBy: String
    $desc: Boolean
    $priceFrom: Float
    $priceTo: Float
    $name: String
    $category: Category
    $gender: Gender
  ) {
    items(
      where: {
        id: $id
        take: $take
        skip: $skip
        sortBy: $sortBy
        desc: $desc
        priceFrom: $priceFrom
        priceTo: $priceTo
        name: $name
        category: $category
        gender: $gender
      }
    ) {
      select {
        id
        name
        price
        imageUrl
        category
        gender
        createdAt
        updatedAt
      }
      maxPrice
      count
    }
  }
`;
