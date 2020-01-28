import React from 'react';
import { SiteForm, SiteFormTitle } from '../../../styles/sharedStyles';
import { StyledTable, TableBody } from './UsersTable.styles';
import UserRow from './usersTable/UserRow';

const UsersTable = () => {
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
          <UserRow email='email@email.com' role='ADMIN' id='SOME ID' />
        </TableBody>
      </StyledTable>
    </SiteForm>
  );
};

export default UsersTable;
