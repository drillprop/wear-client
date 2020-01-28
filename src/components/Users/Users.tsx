import React from 'react';
import { SiteWrapper } from '../../styles/sharedStyles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import UsersTable from './users/UsersTable';

const Users = () => {
  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable />
      </div>
    </SiteWrapper>
  );
};

export default Users;
