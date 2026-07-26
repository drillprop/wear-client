import type { NextPage } from "next";
import Router from "next/router";
import type { ApolloPageContext } from "next-with-apollo";
import React from "react";
import type { MeQuery } from "../generated/types";
import ME from "../graphql/queries/ME";

const redirect = (context: ApolloPageContext, target: string) => {
	if (context.res) {
		// 303 - see other
		context.res.writeHead(303, { Location: target });
		context.res.end();
	} else {
		Router.replace(target);
	}
};

export const withAuth = (Component: NextPage, path: string) => {
	return class AuthComponent extends React.Component {
		static async getInitialProps(ctx: ApolloPageContext) {
			try {
				const { data } = await ctx.apolloClient.query<MeQuery>({ query: ME });
				if (data.me) {
					redirect(ctx, path);
					return {
						me: data.me,
					};
				}
				return {
					me: null,
				};
			} catch (error) {
				console.error(error);
				return {
					me: null,
				};
			}
		}
		render() {
			return <Component {...this.props} />;
		}
	};
};
