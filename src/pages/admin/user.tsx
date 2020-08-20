import { NextPage } from 'next';
import React from 'react';
import SingleUser from '../../components/SingleUser/SingleUser';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

interface Props {
  query: {
    id: string;
  };
}

const User: NextPage<Props> = ({ query }) => {
  return <SingleUser query={query} />;
};

export default withPrivateRoute(User, 'ADMIN');
