import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useSingleItemQuery } from '../../generated/types';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import { useRouter } from 'next/router';

const Item: NextPage = () => {
  const { query } = useRouter();
  const { data, loading } = useSingleItemQuery({
    variables: {
      id: typeof query.id === 'string' ? query.id : '',
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
