import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import SingleUser from "./SingleUser";

/**
 * The admin single-user page runs the real `SingleUser` + `ChangeUserRole`
 * documents through Apollo v4 + MSW (#72): it shows the user and a staff role
 * change surfaces the mutation's message.
 */
it("shows a user and changes their role", async () => {
	// radix Select holds `pointer-events: none` on the body while open.
	const user = userEvent.setup({ pointerEventsCheck: 0 });
	server.use(
		graphql.query("SingleUser", () =>
			HttpResponse.json({
				data: {
					user: {
						id: "1",
						email: "customer@b.co",
						firstName: "Cass",
						lastName: "Toma",
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
		graphql.mutation("ChangeUserRole", () =>
			HttpResponse.json({
				data: { changeUserRole: { message: "Role updated" } },
			}),
		),
	);

	renderWithApollo(
		<AppRouterProvider>
			<SingleUser />
		</AppRouterProvider>,
	);

	expect(await screen.findByText("customer@b.co")).toBeInTheDocument();

	// Open the role select and pick EMPLOYEE → ChangeUserRole mutation.
	await user.click(screen.getByRole("combobox"));
	await user.click(await screen.findByRole("option", { name: "EMPLOYEE" }));

	expect(await screen.findByText("Role updated")).toBeInTheDocument();
});
