import { screen } from "@testing-library/react";
import { type GraphQLResponseResolver, graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import AccountOrders from "./AccountOrders";

/**
 * The orders page runs the real `UserOrders` document (server-scoped to the
 * signed-in user) through Apollo v4 + MSW (#71), rendering the orders table or
 * the empty state.
 */
function stubUserOrders(resolver: GraphQLResponseResolver) {
	server.use(graphql.query("UserOrders", resolver));
}

function renderOrders() {
	return renderWithApollo(
		<AppRouterProvider>
			<AccountOrders />
		</AppRouterProvider>,
	);
}

it("renders the customer's orders", async () => {
	stubUserOrders(() =>
		HttpResponse.json({
			data: {
				userOrders: {
					count: 1,
					select: [
						{
							id: "order-1",
							createdAt: "2024-01-01T00:00:00.000Z",
							status: "PAID",
							orderedItems: [
								{
									id: "oi-1",
									sizeSymbol: "M",
									item: {
										gender: "MAN",
										id: "item-1",
										name: "Linen shirt",
										price: 120,
									},
								},
							],
						},
					],
				},
			},
		}),
	);

	renderOrders();

	expect(await screen.findByText("order-1")).toBeInTheDocument();
	expect(screen.getByText("PAID")).toBeInTheDocument();
});

it("shows the empty state when there are no orders", async () => {
	stubUserOrders(() =>
		HttpResponse.json({ data: { userOrders: { count: 0, select: [] } } }),
	);

	renderOrders();

	expect(await screen.findByText("No orders")).toBeInTheDocument();
});
