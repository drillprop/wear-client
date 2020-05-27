import React, { useState } from 'react';
import { Item, Ordered_Item, OrderStatus } from '../../../generated/types';
import { TableBodyRow, TableData } from '../../../styles/table.styles';
import convertOrderedItems from '../../../utils/convertOrderedItems';
import formatDBDate from '../../../utils/formatDBDate';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import {
  DetailsColumn,
  DetailsHeading,
  DetailsWrapper,
  DetailsRow,
} from './OrderRow.styles';

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
  orderedItems,
}) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const totalPrice = orderedItems?.reduce(
    (acc, item) => (acc = acc + item.item.price),
    0
  );

  const date = createdAt && formatDBDate(createdAt);
  const convertedItems = convertOrderedItems(orderedItems || []);

  return (
    <>
      <TableBodyRow
        grey={grey}
        onClick={() =>
          setDetailsVisible((isDetailsVisible) => !isDetailsVisible)
        }
      >
        <TableData>{id}</TableData>
        <TableData>{date}</TableData>
        <TableData>$ {totalPrice}</TableData>
        <TableData>{status}</TableData>
      </TableBodyRow>
      {isDetailsVisible && (
        <DetailsRow>
          <TableData colSpan={5}>
            <DetailsHeading>Ordered Items</DetailsHeading>
            <DetailsWrapper>
              {convertedItems.map((item) => (
                <DetailsColumn key={item.id + item.sizeSymbol}>
                  <div>
                    {item.quantity} x{' '}
                    <LinkAnchor
                      highlight
                      href={`/[gender]/item?id=${item.id}`}
                      as={`/${item.gender.toLowerCase()}/item?id=${item.id}`}
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
        </DetailsRow>
      )}
    </>
  );
};

export default OrderRow;
