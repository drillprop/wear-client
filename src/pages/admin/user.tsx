import { NextPage } from 'next';
import React from 'react';
import SingleUser from '../../components/SingleUser/SingleUser';
import { withPrivateRoute } from '../../hoc/withPrivateRoute';

const User: NextPage = () => {
  return <SingleUser />;
};

export default withPrivateRoute(User, 'ADMIN');
