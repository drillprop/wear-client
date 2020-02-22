import React, { useContext } from 'react';
import { UsersContext } from '../../contexts/Users.context';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';

const Users = () => {
  const { variables, count, setVariables } = useContext(UsersContext);

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable />
        <Pagination
          total={count}
          state={variables}
          setNewState={setVariables}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
