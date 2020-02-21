import Link from 'next/link';
import React, { useContext } from 'react';
import { ItemsContext } from '../../../../contexts/Items.context';
import {
  Category,
  Gender,
  useDeleteItemMutation
} from '../../../../generated/types';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';
import ITEMS from '../../../../graphql/queries/ITEMS';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
  gender: Gender;
}

const ItemRow: React.FC<Props> = ({ id, name, price, category, gender }) => {
  const { variables } = useContext(ItemsContext);

  const [deleteItem] = useDeleteItemMutation({
    variables: { id },
    refetchQueries: [{ query: ITEMS, variables }]
  });

  return (
    <Link
      href={{
        pathname: `/${gender.toLowerCase()}/item`,
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
        <TableData
          onClick={e => {
            e.stopPropagation();
            deleteItem();
          }}
        >
          delete item
        </TableData>
      </TableBodyRow>
    </Link>
  );
};

export default ItemRow;
