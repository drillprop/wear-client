import React from 'react';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';
import Link from 'next/link';

interface Props {
  grey?: boolean;
  id: string;
  email: string;
  fullName?: string;
  role: string;
  orders?: string[];
}

const UserRow: React.FC<Props> = ({
  grey,
  id,
  email,
  fullName,
  role,
  orders
}) => {
  return (
    <Link
      href={{
        pathname: '/admin/user',
        query: {
          id
        }
      }}
    >
      <TableBodyRow grey={grey}>
        <TableData>{email}</TableData>
        <TableData>{fullName} </TableData>
        <TableData>{role}</TableData>
        <TableData>{orders}</TableData>
      </TableBodyRow>
    </Link>
  );
};

export default UserRow;
