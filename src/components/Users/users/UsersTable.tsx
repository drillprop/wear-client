import React from 'react';
import { UsersQuery } from '../../../generated/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from '../../../styles/table.styles';
import UserRow from './usersTable/UserRow';

interface Props {
  users: UsersQuery['users']['select'];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  const tableColumnNames = ['email', 'full name', 'role', 'orders'];
  return (
    <Table tableColumnNames={tableColumnNames}>
      <TableHead>
        <tr>
          {tableColumnNames.map((name) => (
            <TableHeadCell key={name}>{name}</TableHeadCell>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {users.map(
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
