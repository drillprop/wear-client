import Link from 'next/link';
import React from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables,
  useDeleteItemMutation
} from '../../../../generated/types';
import ITEMS from '../../../../graphql/queries/ITEMS';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
  gender: Gender;
  variables: ItemsQueryVariables;
}

const ItemRow: React.FC<Props> = ({
  id,
  name,
  price,
  category,
  gender,
  variables
}) => {
  const [deleteItem] = useDeleteItemMutation({
    variables: { id },
    refetchQueries: [{ query: ITEMS, variables }]
  });

  return (
    <Link
      href={{
        pathname: `/${gender.toLowerCase()}/item`,
        query: {
          category: category.toLowerCase(),
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
