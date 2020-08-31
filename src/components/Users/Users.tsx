import React from 'react';
import { useUsersQuery } from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersFilters from './users/UsersFilters';
import UsersTable from './users/UsersTable';
import { useRouter } from 'next/router';

const Users: React.FC = () => {
  const { query } = useRouter();
  const { data, refetch, variables } = useUsersQuery({
    variables: {
      take: 5,
      skip: 0,
      sortBy: 'User.createdAt',
      sortOrder: 'ASC',
    },
  });

  const count = data?.users.count || 0;
  const users = data?.users.select || [];
  const page = parseInt(typeof query.page === 'string' ? query.page : '') || 1;

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <SiteSubtitle>List of Users</SiteSubtitle>
        <UsersFilters variables={variables} refetch={refetch} />
        {!!users.length && <UsersTable users={users} />}
        <Pagination
          path={'/admin/users'}
          page={page}
          total={count}
          take={variables.take || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
