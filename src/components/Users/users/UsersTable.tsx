import { ApolloError } from 'apollo-boost';
import React from 'react';
import { UsersQuery } from '../../../generated/types';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import UserRow from './usersTable/UserRow';

interface Props {
  users?: UsersQuery['users'];
  error?: ApolloError;
}

const UsersTable: React.FC<Props> = ({ users }) => {
  return (
    <SiteForm>
      <SiteSubtitle>List of Users</SiteSubtitle>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>id</TableHeadCell>
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
