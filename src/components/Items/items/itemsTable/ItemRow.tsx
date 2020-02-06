import Link from 'next/link';
import React from 'react';
import {
  Category,
  Gender,
  useDeleteItemMutation
} from '../../../../generated/types';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
  gender: Gender;
}

const ItemRow: React.FC<Props> = ({ id, name, price, category, gender }) => {
  const [deleteItem] = useDeleteItemMutation({
    variables: { id }
  });
  return (
    <TableBodyRow>
      <Link
        href={{
          pathname: '/admin/item',
          query: {
            id
          }
        }}
      >
        <>
          <TableData>{name}</TableData>
          <TableData>{price}</TableData>
          <TableData>{category}</TableData>
          <TableData>{gender}</TableData>
        </>
      </Link>
      <TableData onClick={() => deleteItem()}>delete item</TableData>
    </TableBodyRow>
  );
};

export default ItemRow;
