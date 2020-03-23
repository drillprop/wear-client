import React from 'react';
import { UsersQuery } from '../../../generated/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import UserRow from './usersTable/UserRow';

interface Props {
  users: UsersQuery['users']['select'];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  return (
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
            (user, idx) =>
              user && (
                <UserRow
                  grey={idx % 2 !== 0}
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
  );
};

export default UsersTable;
