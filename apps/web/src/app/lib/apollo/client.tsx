"use client";
import { HttpLink } from "@apollo/client";
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from "@apollo/client-integration-nextjs";
import type { ReactNode } from "react";

/**
 * Browser-side Apollo client. Talks to the SAME-ORIGIN proxy route (relative
 * `/api/graphql`) so the browser never learns the API origin (#32).
 * `credentials: "include"` keeps the session cookie first-party.
 */
function makeClient() {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: "/api/graphql",
			credentials: "include",
		}),
	});
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
