import React from 'react';
import { SortOrder, useUsersQuery } from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import UsersFilters from './users/UsersFilters';
import UsersTable from './users/UsersTable';

interface Props {
  query: {
    page: string;
  };
}

const Users: React.FC<Props> = ({ query }) => {
  const { data, refetch, variables } = useUsersQuery({
    variables: {
      take: 5,
      skip: 0,
      sortBy: 'User.createdAt',
      sortOrder: SortOrder.ASC
    }
  });

  const count = data?.users.count || 0;
  const users = data?.users.select || [];

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <SiteSubtitle>List of Users</SiteSubtitle>
        <UsersFilters variables={variables} refetch={refetch} />
        {!!users.length && <UsersTable users={users} />}
        <Pagination
          path={'/admin/users'}
          page={parseInt(query.page) || 1}
          total={count}
          take={variables.take || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Users;
