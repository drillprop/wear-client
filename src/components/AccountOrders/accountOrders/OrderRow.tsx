import React, { useState } from 'react';
import { Item, Ordered_Item, OrderStatus } from '../../../generated/types';
import { TableBodyRow, TableData } from '../../../styles/table.styles';
import {
  DetailsColumn,
  DetailsHeading,
  DetailsWrapper
} from './OrderRow.styles';
import convertOrderedItems from '../../../utils/convertOrderedItems';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';

interface Props {
  grey?: boolean;
  id?: string;
  createdAt?: string;
  status?: OrderStatus;
  orderedItems?: Array<
    Pick<Ordered_Item, 'id' | 'sizeSymbol'> & {
      item: Pick<Item, 'name' | 'price' | 'id' | 'gender'>;
    }
  >;
}

const OrderRow: React.FC<Props> = ({
  grey,
  id,
  createdAt,
  status,
  orderedItems
}) => {
  const [detailsHidden, setDetailsHidden] = useState(false);

  const totalPrice = orderedItems?.reduce(
    (acc, item) => (acc = acc + item.item.price),
    0
  );

  const convertedItems = convertOrderedItems(orderedItems || []);
  return (
    <>
      <TableBodyRow
        grey={grey}
        onClick={() => setDetailsHidden(detailsHidden => !detailsHidden)}
      >
        <TableData>{id}</TableData>
        <TableData>{createdAt}</TableData>
        <TableData>$ {totalPrice}</TableData>
        <TableData>{status}</TableData>
      </TableBodyRow>
      {detailsHidden && (
        <tr>
          <TableData colSpan={5}>
            <DetailsHeading>Ordered Items</DetailsHeading>
            <DetailsWrapper>
              {convertedItems.map(item => (
                <DetailsColumn key={item.id + item.sizeSymbol}>
                  <div>
                    {item.quantity} x{' '}
                    <LinkAnchor
                      highlight
                      href={`/shop/[gender]/item?id=${item.id}`}
                      as={`/shop/${item.gender.toLowerCase()}/item?id=${
                        item.id
                      }`}
                    >
                      {item.name}
                    </LinkAnchor>
                  </div>
                  <div> size: {item.sizeSymbol}</div>
                  <div> $ {item.price}</div>
                </DetailsColumn>
              ))}
            </DetailsWrapper>
          </TableData>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
