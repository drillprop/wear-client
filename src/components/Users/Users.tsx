import React, { useEffect, useState } from 'react';
import {
  SortOrder,
  UsersQueryVariables,
  useUsersQuery
} from '../../generated/types';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';

const Users = () => {
  const [variables, setVariables] = useState<UsersQueryVariables>({
    take: 5,
    skip: 0,
    sortBy: 'User.createdAt',
    email: '',
    sortOrder: SortOrder.Asc
  });

  const { data } = useUsersQuery({
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    setVariables({ ...variables });
  }, [data]);

  const count = data?.users.count || 0;
  const users = data?.users.select || [];
  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable
          users={users}
          variables={variables}
          setVariables={setVariables}
        />
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
