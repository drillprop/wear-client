import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

/**
 * A real Apollo Client v4 wired to a static test endpoint. Deliberately the same
 * shape as the browser client (`src/app/lib/apollo/client.tsx`) — real cache,
 * real `HttpLink` — so tests exercise Apollo end to end; the MSW server
 * (`./msw/server`) intercepts the outgoing request. The URL is absolute because
 * jsdom's fetch can't resolve the relative `/api/graphql` the app uses, and MSW's
 * GraphQL handlers match on operation name rather than endpoint.
 */
export function makeTestClient() {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({ uri: "http://localhost/api/graphql" }),
	});
}

interface ApolloRenderOptions extends Omit<RenderOptions, "wrapper"> {
	client?: ApolloClient;
}

/**
 * Render a component under a live `ApolloProvider`. Tests drive it with real
 * `graphql()` documents from `src/gql` and register MSW responses via
 * `server.use(...)`, so a codegen/document drift shows up as a failing render.
 */
export function renderWithApollo(
	ui: ReactElement,
	{ client = makeTestClient(), ...options }: ApolloRenderOptions = {},
) {
	function Wrapper({ children }: { children: ReactNode }) {
		return <ApolloProvider client={client}>{children}</ApolloProvider>;
	}
	return render(ui, { wrapper: Wrapper, ...options });
}
