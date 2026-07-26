import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "next-with-apollo";

export default withApollo(
	({ headers, initialState }) => {
		const httpLink = new HttpLink({
			uri: process.env.BACKEND_URL,
			credentials: "include",
		});

		// Forward the incoming request headers (e.g. cookies) during SSR.
		const headerLink = setContext((_operation, prevContext) => ({
			headers: {
				...prevContext.headers,
				...headers,
			},
		}));

		return new ApolloClient({
			link: headerLink.concat(httpLink),
			cache: new InMemoryCache().restore(initialState || {}),
		});
	},
	{
		getDataFromTree,
	},
);
