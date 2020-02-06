import Link from 'next/link';
import React from 'react';
import { Category, Gender } from '../../../../generated/types';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
  gender: Gender;
}

const ItemRow: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  category,
  gender
}) => {
  return (
    <Link
      href={{
        pathname: '/admin/item',
        query: {
          id
        }
      }}
    >
      <TableBodyRow>
        <TableData>{name}</TableData>
        <TableData>{price}</TableData>
        <TableData>{category}</TableData>
        <TableData>{gender}</TableData>
      </TableBodyRow>
    </Link>
  );
};

export default ItemRow;
