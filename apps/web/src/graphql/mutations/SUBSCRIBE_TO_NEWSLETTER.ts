import { gql } from "@apollo/client";

export default gql`
  mutation SubscribeToNewsletter($newsletter: Boolean!) {
    subscribeToNewsletter(newsletter: $newsletter) {
      message
    }
  }
`;
