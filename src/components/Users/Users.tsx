import React, { useState } from 'react';
import { useUsersCountQuery, useUsersQuery } from '../../generated/types';
import { SiteWrapper } from '../../styles/sharedStyles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersTable from './users/UsersTable';

const Users = () => {
  const [pages, setPages] = useState({
    take: 5,
    skip: 0
  });

  const { data: usersData, error: usersError } = useUsersQuery({
    variables: {
      take: pages.take,
      skip: pages.skip,
      orderBy: 'User.createdAt'
    }
  });

  const { data: countData, error: countError } = useUsersCountQuery();

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '>')
      setPages({
        ...pages,
        skip: pages.skip + pages.take
      });
    else
      setPages({
        ...pages,
        skip: pages.skip - pages.take
      });
  };

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
