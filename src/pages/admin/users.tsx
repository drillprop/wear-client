import { NextPage } from 'next';
import React from 'react';
import Users from '../../components/Users/Users';
import { UserRole } from '../../generated/types';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

interface Props {
  query: {
    page: string;
  };
}

const UsersPage: NextPage<Props> = ({ query }) => {
  return <Users query={query} />;
};

export default withPrivateRoute(UsersPage, UserRole.ADMIN);
