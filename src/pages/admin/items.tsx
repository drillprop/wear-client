import { NextPage } from 'next';
import React from 'react';
import Items from '../../components/Items/Items';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

const ItemsPage: NextPage = () => {
  return <Items />;
};

export default withPrivateRoute(ItemsPage, 'EMPLOYEE');
