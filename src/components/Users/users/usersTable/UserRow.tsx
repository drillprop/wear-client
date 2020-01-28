import React from 'react';
import { TableData, TableBodyRow } from './UserRow.styles';

interface Props {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  orders?: string[];
}

const UserRow: React.FC<Props> = ({ id, email, fullName, role, orders }) => {
  return (
    <TableBodyRow>
      <TableData>{id}</TableData>
      <TableData>{email}</TableData>
      <TableData>{fullName} </TableData>
      <TableData>{role}</TableData>
      <TableData>{orders}</TableData>
    </TableBodyRow>
  );
};

export default UserRow;
