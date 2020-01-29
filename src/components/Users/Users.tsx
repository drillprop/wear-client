import React from 'react';
import { useUsersCountQuery, useUsersQuery } from '../../generated/types';
import useChangePage from '../../hooks/useChangePage';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';

const Users = () => {
  const {
    pages: { skip, take },
    changePage
  } = useChangePage(5, 0);

  const { data: usersData, error: usersError } = useUsersQuery({
    variables: {
      take,
      skip,
      orderBy: 'User.createdAt'
    }
  });

  const { data: countData, error: countError } = useUsersCountQuery();

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable users={usersData?.users} />
        <Pagination
          changePage={changePage}
          take={take}
          skip={skip}
          total={countData?.usersCount}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
