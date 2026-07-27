import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { beforeEach, vi } from "vitest";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider, mockAppRouter } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import DeleteAccountForm from "./DeleteAccountForm";

/**
 * Deleting the account runs the real `DeleteAccount` document through Apollo v4 +
 * MSW (#71); on success the user leaves the (now un-gated) account area.
 */
beforeEach(() => {
	vi.clearAllMocks();
});

it("deletes the account and navigates home", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("DeleteAccount", () =>
			HttpResponse.json({ data: { deleteAccount: { message: "gone" } } }),
		),
		// deleteAccount refetches `me` (now null).
		graphql.query("Me", () => HttpResponse.json({ data: { me: null } })),
	);

	renderWithApollo(
		<AppRouterProvider>
			<DeleteAccountForm />
		</AppRouterProvider>,
	);

	await user.type(screen.getByLabelText("confirm with password"), "hunter2");
	await user.click(screen.getByRole("button", { name: "delete" }));

	await waitFor(() => expect(mockAppRouter.push).toHaveBeenCalledWith("/"));
});
