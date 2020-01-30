import React from 'react';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';
import { Gender, Category } from '../../../../generated/types';

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
    <TableBodyRow>
      <TableData>{id}</TableData>
      <TableData>{name}</TableData>
      <TableData>{price}</TableData>
      <TableData>{imageUrl}</TableData>
      <TableData>{category}</TableData>
      <TableData>{gender}</TableData>
    </TableBodyRow>
  );
};

export default ItemRow;
