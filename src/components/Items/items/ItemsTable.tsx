import React from 'react';
import { ItemsQuery, ItemsQueryVariables } from '../../../generated/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import ItemRow from './itemsTable/ItemRow';

interface Props {
  items: ItemsQuery['items']['select'];
  variables: ItemsQueryVariables;
}

const ItemsTable: React.FC<Props> = ({ items, variables }) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeadCell>name</TableHeadCell>
          <TableHeadCell>price</TableHeadCell>
          <TableHeadCell>category</TableHeadCell>
          <TableHeadCell>gender</TableHeadCell>
          <TableHeadCell>edit item</TableHeadCell>
          <TableHeadCell>delete item</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        {items &&
          items.map(
            (item, idx) =>
              item && (
                <ItemRow
                  grey={idx % 2 !== 0}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  gender={item.gender}
                  variables={variables}
                />
              )
          )}
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
