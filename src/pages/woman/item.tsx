import { ApolloQueryResult } from 'apollo-boost';
import { NextPage } from 'next';
import { ApolloAppContext } from 'next-with-apollo';
import React from 'react';
import SingleItem from '../../components/SingleItem/SingleItem';
import { SingleItemQuery } from '../../generated/types';
import SINGLE_ITEM from '../../graphql/queries/SINGLE_ITEM';
import Head from 'next/head';

interface Props {
  query: {
    id: any;
  };
  singleItemQuery: ApolloQueryResult<SingleItemQuery>;
}

const Item: NextPage<Props> = ({ query, singleItemQuery }) => {
  const { data } = singleItemQuery;
  return (
    <>
      <Head>
        <title> wear {data.item?.name && `| ${data.item?.name}`}</title>
      </Head>
      <SingleItem query={query} title={data.item?.name} />
    </>
  );
};

Item.getInitialProps = async (ctx: ApolloAppContext) => {
  const singleItemQuery = await ctx.apolloClient.query<SingleItemQuery>({
    query: SINGLE_ITEM,
    variables: ctx.query
  });
  const id = ctx.query;
  return {
    query: {
      id
    },
    singleItemQuery
  };
};

export default Item;
