import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type GraphQLResponseResolver, graphql, HttpResponse } from "msw";
import { beforeEach, vi } from "vitest";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider, mockAppRouter } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import ShopContent from "./shop-content";

beforeEach(() => {
	vi.clearAllMocks();
});

/**
 * Exercises the shop hybrid-prefetch client path (#69): the real `ShopContent`
 * leaf issues the client-preset `Items` document through Apollo v4, MSW answers
 * keyed by the operation name codegen emits, and the rendered catalogue comes
 * back — so a document/schema drift fails here. The second test proves the
 * client-driven refetch: changing the sort re-issues `Items` with new variables
 * and the list updates.
 */
function stubItems(resolver: GraphQLResponseResolver) {
	server.use(graphql.query("Items", resolver));
}

function item(overrides: { id: string; name: string; price: number }) {
	return {
		imageUrl: "/img.jpg",
		category: "SHIRT",
		gender: "MAN",
		createdAt: "2024-01-01T00:00:00.000Z",
		updatedAt: "2024-01-01T00:00:00.000Z",
		sizes: [{ sizeSymbol: "M", quantity: 3 }],
		...overrides,
	};
}

function renderShop() {
	return renderWithApollo(
		<AppRouterProvider>
			<ShopContent gender="man" page={1} />
		</AppRouterProvider>,
	);
}

it("renders the catalogue from the primed Items document", async () => {
	stubItems(() =>
		HttpResponse.json({
			data: {
				items: {
					maxPrice: 200,
					count: 2,
					select: [
						item({ id: "1", name: "Linen shirt", price: 120 }),
						item({ id: "2", name: "Denim jacket", price: 180 }),
					],
				},
			},
		}),
	);

	renderShop();

	expect(await screen.findByText("Linen shirt")).toBeInTheDocument();
	expect(screen.getByText("Denim jacket")).toBeInTheDocument();
});

it("refetches Items client-side when the sort changes", async () => {
	// radix Select holds `pointer-events: none` on the body while open.
	const user = userEvent.setup({ pointerEventsCheck: 0 });
	// Answer by sort direction so a client refetch is observable in the output.
	stubItems(({ variables }) => {
		const ascending = variables.sortOrder === "ASC";
		return HttpResponse.json({
			data: {
				items: {
					maxPrice: 200,
					count: 1,
					select: ascending
						? [item({ id: "3", name: "Cheapest tee", price: 10 })]
						: [item({ id: "1", name: "Linen shirt", price: 120 })],
				},
			},
		});
	});

	renderShop();

	expect(await screen.findByText("Linen shirt")).toBeInTheDocument();

	// Open the "sort by" select and pick lowest price → sortOrder ASC refetch.
	await user.click(screen.getByRole("combobox", { name: "sort by" }));
	await user.click(await screen.findByRole("option", { name: "lowest price" }));

	expect(await screen.findByText("Cheapest tee")).toBeInTheDocument();
	expect(screen.queryByText("Linen shirt")).not.toBeInTheDocument();
});

it("resets pagination to page 1 when a filter changes on a later page", async () => {
	const user = userEvent.setup();
	stubItems(({ variables }) =>
		HttpResponse.json({
			data: {
				items: {
					maxPrice: 200,
					count: 1,
					// echo the skip so we can assert the filter refetch went back to 0
					select: [
						item({
							id: "1",
							name: `skip:${variables.skip ?? 0}`,
							price: 50,
						}),
					],
				},
			},
		}),
	);

	// Start on page 3 (skip 12).
	renderWithApollo(
		<AppRouterProvider>
			<ShopContent gender="man" page={3} />
		</AppRouterProvider>,
	);

	expect(await screen.findByText("skip:12")).toBeInTheDocument();

	// Type in the name filter → debounced refetch must reset skip to 0 and drop
	// the page from the URL.
	await user.type(screen.getByLabelText("search item by name"), "shirt");

	expect(await screen.findByText("skip:0")).toBeInTheDocument();
	expect(mockAppRouter.push).toHaveBeenCalledWith("/shop/man");
});
