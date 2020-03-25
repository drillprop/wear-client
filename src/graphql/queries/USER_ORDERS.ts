import { gql } from 'apollo-boost';

export default gql`
  query UserOrders($take: Int, $skip: Int) {
    userOrders(take: $take, skip: $skip) {
      count
      select {
        id
        createdAt
        status
        orderedItems {
          id
          sizeSymbol
          item {
            name
            price
          }
        }
      }
    }
  }
`;
