import React from 'react';
import { useItemsCountQuery, useItemsQuery } from '../../generated/types';
import useChangePage from '../../hooks/useChangePage';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';

const Items: React.FC = () => {
  const { changePage, skip, take } = useChangePage(5, 0);

  const { data: countData, error: countError } = useItemsCountQuery();

  const { data: itemsData, error: itemsError } = useItemsQuery({
    variables: {
      orderBy: 'Item.createdAt',
      desc: true,
      skip,
      take
    }
  });

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm />
        <ItemsTable items={itemsData?.items} />
        <Pagination
          changePage={changePage}
          take={take}
          skip={skip}
          total={countData?.itemsCount}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
