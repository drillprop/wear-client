import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useSingleItemQuery } from '../../generated/types';
import SingleProduct from '../../components/SingleProduct/SingleProduct';

interface Props {
  query: {
    id: string;
  };
}

const Item: NextPage<Props> = ({ query }) => {
  const { data, loading } = useSingleItemQuery({
    variables: {
      id: query.id,
    },
  });
  return (
    <>
      <Head>
        <title>
          wear {data ? data.item?.name && `| ${data.item?.name}` : ''}
        </title>
      </Head>
      <SingleProduct item={data?.item} loading={loading} />
    </>
  );
};

export default Item;
