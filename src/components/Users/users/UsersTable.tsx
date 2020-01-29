import { ApolloError } from 'apollo-boost';
import React from 'react';
import { UsersQueryResult } from '../../../generated/types';
import { StyledTable, TableBody } from './UsersTable.styles';
import UserRow from './usersTable/UserRow';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';

interface Props {
  data?: UsersQueryResult['data'];
  error?: ApolloError;
}

const UsersTable: React.FC<Props> = ({ data }) => {
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
