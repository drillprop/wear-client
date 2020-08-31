import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import EditItemForm from '../../../components/EditItemForm/EditItemForm';
import { useSingleItemQuery } from '../../../generated/types';
import { withPrivateRoute } from '../../../hoc/withPrivateRoute';
import { useRouter } from 'next/router';

const AdminItem: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSingleItemQuery({
    variables: {
      id: typeof query.item === 'string' ? query.item : '',
    },
  });
  return (
    <>
      <Head>
        <title> wear | edit item</title>
      </Head>
      <EditItemForm item={data?.item} />;
    </>
  );
};

export default withPrivateRoute(AdminItem, 'EMPLOYEE');
