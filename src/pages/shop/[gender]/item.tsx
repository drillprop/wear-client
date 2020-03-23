import { ApolloQueryResult } from 'apollo-boost';
import { NextPage } from 'next';
import { ApolloAppContext } from 'next-with-apollo';
import Head from 'next/head';
import React from 'react';
import SingleProduct from '../../../components/SingleProduct/SingleProduct';
import { SingleItemQuery } from '../../../generated/types';
import SINGLE_ITEM from '../../../graphql/queries/SINGLE_ITEM';

interface Props {
  singleItemQuery: ApolloQueryResult<SingleItemQuery>;
}

const Item: NextPage<Props> = ({ singleItemQuery }) => {
  const { data } = singleItemQuery;
  return (
    <>
      <Head>
        <title> wear {data.item?.name && `| ${data.item?.name}`}</title>
      </Head>
      <SingleProduct item={data.item} />
    </>
  );
};

Item.getInitialProps = async (ctx: ApolloAppContext) => {
  const singleItemQuery = await ctx.apolloClient.query<SingleItemQuery>({
    query: SINGLE_ITEM,
    variables: ctx.query
  });
  return { singleItemQuery };
};

export default Item;
