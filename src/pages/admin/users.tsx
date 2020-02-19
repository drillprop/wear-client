import { NextPage } from 'next';
import React from 'react';
import Users from '../../components/Users/Users';
import UsersProvider from '../../contexts/Users.context';

const UsersPage: NextPage = () => {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
};

export default UsersPage;
