import { NextPage } from 'next';
import { ApolloAppContext } from 'next-with-apollo';
import Router from 'next/router';
import React from 'react';
import { MeQuery, UserRole } from '../generated/types';
import ME from '../graphql/queries/ME';

const redirectToSign = (context: ApolloAppContext) => {
  const signUrl = '/sign?redirected=true';
  if (context.res) {
    context.res.writeHead(302, { Location: signUrl });
    context.res.end();
  } else {
    Router.replace(signUrl);
  }
};

export const withPrivateRoute = (
  Component: NextPage<any>,
  availableFor: UserRole = UserRole.CUSTOMER
) => {
  return class PrivateRoute extends React.Component {
    static async getInitialProps(ctx: ApolloAppContext) {
      try {
        const { data } = await ctx.apolloClient.query<MeQuery>({ query: ME });

        const requiredLevel = Object.keys(UserRole).indexOf(availableFor);
        // -1 not signed
        //  0 ADMIN
        //  1 EMPLOYEE
        //  2 CUSTOMER
        const userLevel = Object.keys(UserRole).indexOf(data.me?.role || '');
        const isAllowed = userLevel <= requiredLevel;

        if (isAllowed) {
          return data.me;
        } else {
          redirectToSign(ctx);
        }
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
