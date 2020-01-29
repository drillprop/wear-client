import { ApolloError } from 'apollo-boost';
import React from 'react';
import { UsersQueryResult } from '../../../generated/types';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';
import UserRow from './usersTable/UserRow';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';

interface Props {
  data?: UsersQueryResult['data'];
  error?: ApolloError;
}

const UsersTable: React.FC<Props> = ({ data }) => {
  return (
    <SiteForm>
      <SiteFormTitle>List of Users</SiteFormTitle>
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
      </Table>
    </SiteForm>
  );
};

export default UsersTable;
