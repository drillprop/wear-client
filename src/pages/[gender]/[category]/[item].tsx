import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import SingleProduct from '../../../components/SingleProduct/SingleProduct';
import { useSingleItemQuery } from '../../../generated/types';

interface Props {
  query: {
    item: string;
  };
}

const Item: NextPage<Props> = ({ query }) => {
  const { data, loading } = useSingleItemQuery({
    variables: {
      id: query.item,
    },
  });
  return (
    <>
      <Head>
        <title>
          wear{' '}
          {data ? data.item?.name && `| ${data.item?.name}` : '| not found'}
        </title>
      </Head>
      <SingleProduct item={data?.item} loading={loading} />
    </>
  );
};

export default Item;
