import { NextPage } from 'next';
import { ApolloAppContext } from 'next-with-apollo';
import Router from 'next/router';
import React from 'react';
import { MeQuery } from '../generated/types';
import { ME } from '../graphql/queries';

const redirect = (context: ApolloAppContext, target: string) => {
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
    static async getInitialProps(ctx: ApolloAppContext) {
      const { data } = await ctx.apolloClient.query<MeQuery>({ query: ME });
      if (data.me) {
        redirect(ctx, path);
        return {
          me: data.me
        };
      }
      return {
        me: null
      };
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};
