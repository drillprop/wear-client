import { screen } from "@testing-library/react";
import { type GraphQLResponseResolver, graphql, HttpResponse } from "msw";
import CartContextProvider from "@/contexts/CartContext";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import ItemContent from "./item-content";

/**
 * The single-item leaf issues the client-preset `SingleItem` document through
 * Apollo v4 (MSW answers by operation name) and renders the shared
 * `SingleProduct` hydrated from it — exercising the real generated document and
 * the add-to-cart surface (via `CartContext`).
 */
function stubSingleItem(resolver: GraphQLResponseResolver) {
	server.use(graphql.query("SingleItem", resolver));
}

function renderItem() {
	return renderWithApollo(
		<AppRouterProvider>
			<CartContextProvider>
				<ItemContent />
			</CartContextProvider>
		</AppRouterProvider>,
	);
}

it("renders the single item with its sizes from the generated document", async () => {
	stubSingleItem(() =>
		HttpResponse.json({
			data: {
				item: {
					id: "1",
					name: "Linen shirt",
					description: "Breathable summer linen",
					price: 120,
					imageUrl: "/img.jpg",
					category: "SHIRT",
					gender: "MAN",
					createdAt: "2024-01-01T00:00:00.000Z",
					updatedAt: "2024-01-01T00:00:00.000Z",
					sizes: [{ sizeSymbol: "M", quantity: 2 }],
				},
			},
		}),
	);

	renderItem();

	expect(await screen.findByText("Linen shirt")).toBeInTheDocument();
	expect(screen.getByText("Breathable summer linen")).toBeInTheDocument();
	expect(screen.getByText("add to cart")).toBeInTheDocument();
});

it("shows the empty state when the item is missing", async () => {
	stubSingleItem(() => HttpResponse.json({ data: { item: null } }));

	renderItem();

	expect(await screen.findByText("No such item")).toBeInTheDocument();
});
