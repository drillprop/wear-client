import React from 'react';
import { ItemsQuery, ItemsQueryVariables } from '../../../generated/types';
import { SiteForm } from '../../../styles/site.styles';
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
    <SiteForm>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>name</TableHeadCell>
            <TableHeadCell>price</TableHeadCell>
            <TableHeadCell>category</TableHeadCell>
            <TableHeadCell>gender</TableHeadCell>
            <TableHeadCell>delete item</TableHeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {items &&
            items.map(
              item =>
                item && (
                  <ItemRow
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
    </SiteForm>
  );
};

export default ItemsTable;
