import React, { useContext } from 'react';
import { ItemsContext } from '../../../contexts/Items.context';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell
} from '../../../styles/table.styles';
import ItemRow from './itemsTable/ItemRow';
import ItemsFilters from './itemsTable/ItemsFilters';

const ItemsTable: React.FC = () => {
  const { items } = useContext(ItemsContext);
  return (
    <SiteForm>
      <SiteSubtitle>List of Items</SiteSubtitle>
      <ItemsFilters />
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
                  />
                )
            )}
        </TableBody>
      </Table>
    </SiteForm>
  );
};

export default ItemsTable;
