import React from 'react';
import { useUsersQuery } from '../../../generated/types';
import { SiteForm, SiteFormTitle } from '../../../styles/sharedStyles';
import { StyledTable, TableBody } from './UsersTable.styles';
import UserRow from './usersTable/UserRow';

const UsersTable = () => {
  const { data, error } = useUsersQuery({
    variables: {
      take: 5,
      skip: 0
    }
  });

  return (
    <SiteForm>
      <SiteFormTitle>List of Users</SiteFormTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>full name</th>
            <th>role</th>
            <th>orders</th>
          </tr>
        </thead>
        <TableBody>
          {data?.users.map(user => {
            if (user) {
              return (
                <UserRow
                  key={user.id}
                  email={user.email}
                  role={user.role}
                  id={user.id}
                  fullName={`${user.firstName || ''} ${user.lastName || ''}`}
                />
              );
            }
          })}
        </TableBody>
      </StyledTable>
    </SiteForm>
  );
};

export default UsersTable;
