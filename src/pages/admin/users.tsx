import { NextPage } from 'next';
import React from 'react';
import Users from '../../components/Users/Users';

interface Props {
  query: {
    page?: string;
  };
}

const UsersPage: NextPage<Props> = ({ query }) => {
  return <Users query={query} />;
};

export default UsersPage;
