import React from 'react';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';
import Link from 'next/link';

interface Props {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  orders?: string[];
}

const UserRow: React.FC<Props> = ({ id, email, fullName, role, orders }) => {
  return (
    <Link
      href={{
        pathname: '/admin/user',
        query: {
          id
        }
      }}
    >
      <TableBodyRow>
        <TableData>{id}</TableData>
        <TableData>{email}</TableData>
        <TableData>{fullName} </TableData>
        <TableData>{role}</TableData>
        <TableData>{orders}</TableData>
      </TableBodyRow>
    </Link>
  );
};

export default UserRow;
