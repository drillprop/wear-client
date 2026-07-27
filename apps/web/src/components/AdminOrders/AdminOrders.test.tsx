import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import AdminOrders from "./AdminOrders";

/**
 * The admin orders page runs the real `Orders` document through Apollo v4 + MSW,
 * and a status change issues `ManageOrder` (#72).
 */
it("lists orders and manages an order's status", async () => {
	const user = userEvent.setup();
	let managed = false;
	server.use(
		graphql.query("Orders", () =>
			HttpResponse.json({
				data: {
					orders: [
						{
							id: "order-1",
							createdAt: "2024-01-01T00:00:00.000Z",
							status: "PENDING",
							orderedBy: { id: "u1", email: "buyer@b.co" },
							orderedItems: [],
						},
					],
				},
			}),
		),
		graphql.mutation("ManageOrder", () => {
			managed = true;
			return HttpResponse.json({ data: { manageOrder: { message: "ok" } } });
		}),
	);

	renderWithApollo(
		<AppRouterProvider>
			<AdminOrders />
		</AppRouterProvider>,
	);

	expect(await screen.findByText("buyer@b.co")).toBeInTheDocument();

	await user.click(screen.getByText("order status"));
	await user.click(screen.getByText("SENT"));

	await waitFor(() => expect(managed).toBe(true));
});

it("deletes an order via the DeleteOrder mutation", async () => {
	const user = userEvent.setup();
	let deleted = false;
	server.use(
		graphql.query("Orders", () =>
			HttpResponse.json({
				data: {
					orders: [
						{
							id: "order-1",
							createdAt: "2024-01-01T00:00:00.000Z",
							status: "PENDING",
							orderedBy: { id: "u1", email: "buyer@b.co" },
							orderedItems: [],
						},
					],
				},
			}),
		),
		graphql.mutation("DeleteOrder", () => {
			deleted = true;
			return HttpResponse.json({ data: { deleteOrder: { message: "ok" } } });
		}),
	);

	renderWithApollo(
		<AppRouterProvider>
			<AdminOrders />
		</AppRouterProvider>,
	);

	await user.click(await screen.findByText("delete order"));

	await waitFor(() => expect(deleted).toBe(true));
});
