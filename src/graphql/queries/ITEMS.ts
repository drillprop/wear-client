import { gql } from 'apollo-boost';

export default gql`
  query Items(
    $id: ID
    $take: Int
    $skip: Int
    $sortBy: String
    $sortOrder: SortOrder
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
        sortOrder: $sortOrder
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
        sizes {
          xs
          s
          m
          l
          xl
          xxl
        }
      }
      maxPrice
      count
    }
  }
`;
