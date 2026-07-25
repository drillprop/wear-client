import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";

export default withApollo(
	({ headers, initialState }) =>
		new ApolloClient({
			uri: process.env.BACKEND_URL,
			credentials: "include",
			request: (operation) => {
				operation.setContext({
					fetchOptions: {
						credentials: "include",
					},
					headers,
				});
			},
			cache: new InMemoryCache().restore(initialState || {}),
		}),
	{
		getDataFromTree: "ssr",
	},
);
