import React from 'react';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from '../../styles/table.styles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import OrderRow from './accountOrders/OrderRow';
import { useUserOrdersQuery } from '../../generated/types';
import Pagination from '../Pagination/Pagination';
import NoItems from '../NoItems/NoItems';
import Button from '../Button/Button';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

interface Props {
  query: {
    page: string;
  };
}

const AccountOrders: React.FC<Props> = ({ query }) => {
  const tableColumnNames = ['order', 'date', 'total price', 'status'];
  const { data, variables, refetch } = useUserOrdersQuery({
    variables: {
      take: 5,
      skip: 0,
    },
  });

  const count = data?.userOrders?.count;
  return (
    <SiteWrapper>
      <AccountSideNav />
      <div>
        <SiteSubtitle>Your orders</SiteSubtitle>
        {data?.userOrders?.select.length ? (
          <Table tableColumnNames={tableColumnNames}>
            <TableHead>
              <tr>
                {tableColumnNames.map((name) => (
                  <TableHeadCell key={name}>{name}</TableHeadCell>
                ))}
              </tr>
            </TableHead>
            <TableBody>
              {data?.userOrders?.select.map(
                (userOrder, idx) =>
                  userOrder && (
                    <OrderRow
                      grey={idx % 2 !== 0}
                      createdAt={userOrder.createdAt}
                      status={userOrder.status}
                      id={userOrder.id}
                      orderedItems={userOrder.orderedItems}
                      key={userOrder.id}
                    />
                  )
              )}
            </TableBody>
          </Table>
        ) : (
          <NoItems text='No orders'>
            <LinkAnchor href='/'>
              <Button marginTop='20px' width='200px'>
                back to shop
              </Button>
            </LinkAnchor>
          </NoItems>
        )}
        <Pagination
          path={'/account/orders'}
          page={parseInt(query.page) || 1}
          total={count}
          take={(variables && variables.take) || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default AccountOrders;
