import React from 'react';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import { ItemsQuery } from '../../../generated/types';
import ItemRow from './itemsTable/ItemRow';

interface Props {
  items?: ItemsQuery['items'];
}

const ItemsTable: React.FC<Props> = ({ items }) => {
  return (
    <SiteForm>
      <SiteFormTitle>List of Items</SiteFormTitle>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>name</TableHeadCell>
            <TableHeadCell>price</TableHeadCell>
            <TableHeadCell>imageUrl</TableHeadCell>
            <TableHeadCell>category</TableHeadCell>
            <TableHeadCell>gender</TableHeadCell>
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
                  />
                )
            )}
        </TableBody>
      </Table>
    </SiteForm>
  );
};

export default ItemsTable;
