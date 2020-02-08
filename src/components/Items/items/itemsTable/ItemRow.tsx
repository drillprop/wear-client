import Link from 'next/link';
import React, { useContext } from 'react';
import { ItemsContext } from '../../../../contexts/Items.context';
import {
  Category,
  Gender,
  useDeleteItemMutation
} from '../../../../generated/types';
import { ITEMS, ITEMS_COUNT } from '../../../../graphql/queries';
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
  const { itemsQueryVariables } = useContext(ItemsContext);
  const [deleteItem] = useDeleteItemMutation({
    variables: { id },
    refetchQueries: [
      {
        query: ITEMS,
        variables: itemsQueryVariables
      },
      {
        query: ITEMS_COUNT
      }
    ]
  });

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
