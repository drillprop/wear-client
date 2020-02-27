import React from 'react';
import { UsersQuery, UsersQueryVariables } from '../../../generated/types';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import UserRow from './usersTable/UserRow';
import UsersFilters from './usersTable/UsersFilters';

interface Props {
  users: UsersQuery['users']['select'];
  variables: UsersQueryVariables;
  setVariables: React.Dispatch<React.SetStateAction<UsersQueryVariables>>;
}

const UsersTable: React.FC<Props> = ({ users, variables, setVariables }) => {
  return (
    <SiteForm>
      <SiteSubtitle>List of Users</SiteSubtitle>
      <UsersFilters variables={variables} setVariables={setVariables} />
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
