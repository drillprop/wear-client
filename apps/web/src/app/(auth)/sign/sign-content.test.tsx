import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { beforeEach, vi } from "vitest";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider, mockAppRouter } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import SignContent from "./sign-content";

/**
 * The sign island runs the real `Login` / `Register` mutation forms through
 * Apollo v4 + MSW (keyed by the generated operation names). Covers the form
 * flows (#70): a successful login navigates home, register validates the
 * password match client-side, and the switch toggles between the two forms.
 */
beforeEach(() => {
	vi.clearAllMocks();
});

function renderSign() {
	return renderWithApollo(
		<AppRouterProvider>
			<SignContent />
		</AppRouterProvider>,
	);
}

it("logs in and navigates home on success", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("Login", () =>
			HttpResponse.json({
				data: {
					login: {
						id: "1",
						email: "a@b.co",
						firstName: null,
						lastName: null,
					},
				},
			}),
		),
	);

	renderSign();

	await user.type(screen.getByLabelText("email"), "a@b.co");
	await user.type(screen.getByLabelText("password"), "hunter2");
	await user.click(screen.getByRole("button", { name: "login" }));

	await waitFor(() => expect(mockAppRouter.push).toHaveBeenCalledWith("/"));
});

it("switches to register and blocks a mismatched password", async () => {
	const user = userEvent.setup();

	renderSign();

	// SwitchSignButton renders the label twice (a `lg:hidden` mobile span and a
	// `hidden lg:inline` desktop span for the CSS breakpoint toggle), so target
	// the switch by its button role rather than the now-duplicated text.
	await user.click(screen.getByRole("button", { name: /DON'T HAVE ACCOUNT/ }));
	expect(screen.getByText("CREATE NEW ACCOUNT")).toBeInTheDocument();

	await user.type(screen.getByLabelText("email"), "a@b.co");
	await user.type(screen.getByLabelText("password"), "hunter2");
	await user.type(screen.getByLabelText("confirm password"), "different");
	await user.click(screen.getByRole("button", { name: "register" }));

	expect(await screen.findByText(/Password don't match/)).toBeInTheDocument();
	expect(mockAppRouter.push).not.toHaveBeenCalled();
});
