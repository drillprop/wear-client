import { screen } from "@testing-library/react";
import { type GraphQLResponseResolver, graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import HomeContent from "./home-content";

/**
 * Exercises the whole client data path the MSW harness exists to cover (#68):
 * the real `HomeContent` component issues the client-preset `HomeItemCount`
 * document through a real Apollo v4 client, MSW answers it, and the rendered
 * output comes back. Because the request is keyed by the operation name that
 * codegen emits, a document/schema drift breaks these tests rather than passing
 * silently.
 */
function stubHomeItemCount(resolver: GraphQLResponseResolver) {
	server.use(graphql.query("HomeItemCount", resolver));
}

function renderHome() {
	return renderWithApollo(
		<AppRouterProvider>
			<HomeContent />
		</AppRouterProvider>,
	);
}

it("renders the catalogue count from the API through Apollo + the generated document", async () => {
	stubHomeItemCount(() =>
		HttpResponse.json({ data: { items: { count: 42 } } }),
	);

	renderHome();

	expect(
		await screen.findByText(/42 items in the catalogue/),
	).toBeInTheDocument();
});

it("surfaces an API error on the home page", async () => {
	stubHomeItemCount(() => HttpResponse.json({ errors: [{ message: "boom" }] }));

	renderHome();

	expect(await screen.findByText(/API error/)).toBeInTheDocument();
});
