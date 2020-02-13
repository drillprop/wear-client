import { gql } from 'apollo-boost';

export default gql`
  mutation UpdateAddress(
    $addressLine1: String
    $addressLine2: String
    $zipCode: String
    $city: String
    $country: String
  ) {
    updateAddress(
      input: {
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        zipCode: $zipCode
        city: $city
        country: $country
      }
    ) {
      message
    }
  }
`;
