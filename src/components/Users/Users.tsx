import React, { useState } from 'react';
import { useUsersCountQuery, useUsersQuery } from '../../generated/types';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';
import { SiteWrapper } from '../../styles/site.styles';
import useChangePage from '../../hooks/useChangePage';

const Users = () => {
  const { pages, changePage } = useChangePage(5, 0);

  const { data: usersData, error: usersError } = useUsersQuery({
    variables: {
      take: pages.take,
      skip: pages.skip,
      orderBy: 'User.createdAt'
    }
  });

  const { data: countData, error: countError } = useUsersCountQuery();

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <UsersTable data={usersData} />
        <Pagination
          changePage={changePage}
          take={pages.take}
          skip={pages.skip}
          total={countData?.usersCount}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
