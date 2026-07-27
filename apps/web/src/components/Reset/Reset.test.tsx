import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import type { ReactNode } from "react";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import Reset from "./Reset";

/**
 * The reset surface runs the real `ResetPassword` / `ChangePassword` documents
 * through Apollo v4 + MSW. Without a token it requests a reset email; with a
 * `?token=` it completes the reset with a new password (#70) — matching the
 * rebuilt API's two-step flow.
 */
function withSearchParams(params: string, children: ReactNode) {
	return (
		<AppRouterProvider>
			<SearchParamsContext.Provider value={new URLSearchParams(params)}>
				{children}
			</SearchParamsContext.Provider>
		</AppRouterProvider>
	);
}

it("requests a reset email when no token is present", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("ResetPassword", () =>
			HttpResponse.json({
				data: { resetPassword: { message: "Check your email" } },
			}),
		),
	);

	renderWithApollo(withSearchParams("", <Reset />));

	expect(screen.getByText("reset password")).toBeInTheDocument();
	await user.type(screen.getByLabelText("email"), "a@b.co");
	await user.click(screen.getByRole("button", { name: "send email" }));

	expect(await screen.findByText("Check your email")).toBeInTheDocument();
});

it("changes the password when a token is present", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("ChangePassword", () =>
			HttpResponse.json({
				data: { changePassword: { message: "Password updated" } },
			}),
		),
	);

	renderWithApollo(withSearchParams("token=reset-tok", <Reset />));

	expect(screen.getByText("set a new password")).toBeInTheDocument();
	await user.type(screen.getByLabelText("new password"), "hunter2");
	await user.click(screen.getByRole("button", { name: "change password" }));

	expect(await screen.findByText("Password updated")).toBeInTheDocument();
});
