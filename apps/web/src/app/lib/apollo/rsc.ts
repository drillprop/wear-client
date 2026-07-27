import "server-only";
import { HttpLink } from "@apollo/client";
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";
import { internalApiHeaders, internalApiUrl } from "../internal-api";

/**
 * Server-side Apollo client (RSC + route-group layouts). Talks DIRECTLY to the
 * internal API (server→server) via INTERNAL_API_URL, forwarding the request's
 * httpOnly session cookie and injecting the shared secret (#32). This module is
 * `server-only`, so the API origin and secret never reach the browser.
 *
 * `getClient`/`query` fetch on the server; `PreloadQuery` primes the browser
 * cache for the hybrid-prefetch data pattern (wired up in the data-page slices).
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: internalApiUrl(),
			fetch: async (input, init) => {
				const cookieHeader = (await cookies()).toString();
				return fetch(input, {
					...init,
					headers: {
						...init?.headers,
						...internalApiHeaders(cookieHeader),
					},
				});
			},
		}),
	});
});
