import { gql } from 'apollo-boost';

export default gql`
  query Items(
    $whereId: ID
    $take: Int
    $skip: Int
    $orderBy: String
    $desc: Boolean
    $priceFrom: Float
    $priceTo: Float
    $whereName: String
    $whereCategory: Category
    $whereGender: Gender
  ) {
    items(
      input: {
        whereId: $whereId
        take: $take
        skip: $skip
        orderBy: $orderBy
        desc: $desc
        priceFrom: $priceFrom
        priceTo: $priceTo
        whereName: $whereName
        whereCategory: $whereCategory
        whereGender: $whereGender
      }
    ) {
      count
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
    }
  }
`;
