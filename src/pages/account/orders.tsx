import { NextPage } from 'next';
import React from 'react';
import AccountOrders from '../../components/AccountOrders/AccountOrders';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

const OrdersPage: NextPage = () => {
  return <AccountOrders />;
};

export default withPrivateRoute(OrdersPage);
