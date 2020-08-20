import { NextPage } from 'next';
import React from 'react';
import Items from '../../components/Items/Items';
import { UserRole } from '../../generated/types';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

interface Props {
  query?: {
    page: string;
  };
}

const ItemsPage: NextPage<Props> = ({ query }) => {
  return <Items query={query} />;
};

export default withPrivateRoute(ItemsPage, 'EMPLOYEE');
