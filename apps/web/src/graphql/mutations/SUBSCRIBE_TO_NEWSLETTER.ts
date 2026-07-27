import { gql } from "@apollo/client-v3";

export default gql`
  mutation SubscribeToNewsletter($newsletter: Boolean!) {
    subscribeToNewsletter(newsletter: $newsletter) {
      message
    }
  }
`;
