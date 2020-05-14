import { NextPage } from 'next';
import React from 'react';
import { UserRole } from '../../generated/types';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

const OrdersPage: NextPage = () => {
  return <div>OrdersPage page</div>;
};

export default withPrivateRoute(OrdersPage, UserRole.EMPLOYEE);
