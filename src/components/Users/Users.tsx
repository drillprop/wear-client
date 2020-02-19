import React, { useContext } from 'react';
import { UsersContext } from '../../contexts/Users.context';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';

const Users = () => {
  const { changePage, variables, count } = useContext(UsersContext);

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable />
        <Pagination
          changePage={changePage}
          take={variables.take || 5}
          skip={variables.skip || 0}
          total={count}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
