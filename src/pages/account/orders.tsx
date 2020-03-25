import React from 'react';
import AccountOrders from '../../components/AccountOrders/AccountOrders';
import { NextPage } from 'next';

interface Props {
  query: {
    page: string;
  };
}

const OrdersPage: NextPage<Props> = ({ query }) => {
  return <AccountOrders query={query} />;
};

export default OrdersPage;
