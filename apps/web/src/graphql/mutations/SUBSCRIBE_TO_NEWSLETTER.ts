import { graphql } from "@/gql";

/** `SubscribeToNewsletter` — toggles the signed-in customer's newsletter flag. */
export const subscribeToNewsletter = graphql(`
	mutation SubscribeToNewsletter($newsletter: Boolean!) {
		subscribeToNewsletter(newsletter: $newsletter) {
			message
		}
	}
`);
