import React, { useState } from 'react';
import { Item, Ordered_Item, OrderStatus } from '../../../generated/types';
import { TableBodyRow, TableData } from '../../../styles/table.styles';
import {
  DetailsColumn,
  DetailsHeading,
  DetailsWrapper
} from './OrderRow.styles';

interface Props {
  grey?: boolean;
  id?: string;
  createdAt?: string;
  status?: OrderStatus;
  orderedItems?: Array<
    Pick<Ordered_Item, 'id' | 'sizeSymbol'> & {
      item: Pick<Item, 'name' | 'price'>;
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
  const [detailsHidden, setDetailsHidden] = useState(true);

  const totalPrice = orderedItems?.reduce(
    (acc, item) => (acc = acc + item.item.price),
    0
  );
  console.log(totalPrice);
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
        <TableBodyRow>
          <TableData colSpan={5}>
            <DetailsHeading>Details</DetailsHeading>
            <DetailsWrapper>
              {orderedItems?.map(item => (
                <DetailsColumn key={item.id}>
                  <div>1 x</div>
                  <div> {item.item.name}</div>
                  <div> size: {item.sizeSymbol}</div>
                  <div> $ {item.item.price}</div>
                </DetailsColumn>
              ))}
            </DetailsWrapper>
          </TableData>
        </TableBodyRow>
      )}
    </>
  );
};

export default OrderRow;
