import Link from 'next/link';
import React from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables,
  useDeleteItemMutation,
} from '../../../../generated/types';
import ITEMS from '../../../../graphql/queries/ITEMS';
import { TableBodyRow, TableData } from '../../../../styles/table.styles';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';

interface Props {
  grey?: boolean;
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
  variables,
  grey,
}) => {
  const [deleteItem] = useDeleteItemMutation({
    variables: { id },
    refetchQueries: [{ query: ITEMS, variables }],
  });

  return (
    <Link
      href={{
        pathname: `/shop/item`,
        query: {
          id,
        },
      }}
      as={`/shop/item?id=${id}`}
    >
      <TableBodyRow grey={grey}>
        <TableData>{name}</TableData>
        <TableData>{price}</TableData>
        <TableData>{category}</TableData>
        <TableData>{gender}</TableData>
        <TableData>
          <LinkAnchor
            href={{
              pathname: `/admin/items/[item]`,
              query: {
                item: id,
              },
            }}
            as={`/admin/items/${id}`}
          >
            edit item
          </LinkAnchor>
        </TableData>
        <TableData
          onClick={(e) => {
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
