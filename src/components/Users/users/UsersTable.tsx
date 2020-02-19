import { ApolloError } from 'apollo-boost';
import React, { useContext } from 'react';
import { UsersQuery } from '../../../generated/types';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import UserRow from './usersTable/UserRow';
import { UsersContext } from '../../../contexts/Users.context';
import UsersFilters from './usersTable/UsersFilters';

const UsersTable: React.FC = () => {
  const { users } = useContext(UsersContext);
  return (
    <SiteForm>
      <SiteSubtitle>List of Users</SiteSubtitle>
      <UsersFilters />
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>email</TableHeadCell>
            <TableHeadCell>full name</TableHeadCell>
            <TableHeadCell>role</TableHeadCell>
            <TableHeadCell>orders</TableHeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {users &&
            users.map(
              user =>
                user && (
                  <UserRow
                    key={user.id}
                    email={user.email}
                    role={user.role}
                    id={user.id}
                    fullName={`${user.firstName || ''} ${user.lastName || ''}`}
                  />
                )
            )}
        </TableBody>
      </Table>
    </SiteForm>
  );
};

export default UsersTable;
