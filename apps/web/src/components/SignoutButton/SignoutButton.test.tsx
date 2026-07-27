import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { beforeEach, vi } from "vitest";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider, mockAppRouter } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import SignoutButton from "./SignoutButton";

/**
 * Signout runs the real `Signout` mutation (clearing the session cookie via the
 * proxy) and navigates home so the server re-evaluates auth (#70).
 */
beforeEach(() => {
	vi.clearAllMocks();
});

it("signs out and navigates home", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("Signout", () =>
			HttpResponse.json({ data: { signout: { message: "bye" } } }),
		),
	);

	renderWithApollo(
		<AppRouterProvider>
			<SignoutButton />
		</AppRouterProvider>,
	);

	await user.click(screen.getByRole("button", { name: "sign out" }));

	await waitFor(() => expect(mockAppRouter.push).toHaveBeenCalledWith("/"));
});
