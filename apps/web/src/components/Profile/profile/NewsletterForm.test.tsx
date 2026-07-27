import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { server } from "@/test-utils/msw/server";
import NewsletterForm from "./NewsletterForm";

/**
 * The newsletter toggle runs the real `Me` + `SubscribeToNewsletter` documents
 * through Apollo v4 + MSW (#71): toggling the checkbox issues the mutation.
 */
it("toggles the newsletter subscription", async () => {
	const user = userEvent.setup();
	let subscribed: boolean | undefined;
	server.use(
		graphql.query("Me", () =>
			HttpResponse.json({
				data: {
					me: {
						id: "1",
						email: "a@b.co",
						firstName: null,
						lastName: null,
						phoneNumber: null,
						role: "CUSTOMER",
						createdAt: "2024-01-01T00:00:00.000Z",
						updatedAt: "2024-01-01T00:00:00.000Z",
						newsletter: false,
						address: null,
					},
				},
			}),
		),
		graphql.mutation("SubscribeToNewsletter", ({ variables }) => {
			subscribed = variables.newsletter;
			return HttpResponse.json({
				data: { subscribeToNewsletter: { message: "ok" } },
			});
		}),
	);

	renderWithApollo(<NewsletterForm />);

	await user.click(await screen.findByLabelText("subscribe to newsletter"));

	await waitFor(() => expect(subscribed).toBe(true));
});
