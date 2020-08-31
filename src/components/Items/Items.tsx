import React from 'react';
import { useItemsQuery } from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsFilters from './items/ItemsFilters';
import ItemsTable from './items/ItemsTable';
import { useRouter } from 'next/router';

const Items = () => {
  const { query } = useRouter();
  const { data, refetch, variables } = useItemsQuery({
    variables: {
      take: 5,
      skip: 0,
      sortBy: 'Item.createdAt',
      sortOrder: 'DESC',
      available: false,
    },
  });

  const page = parseInt(typeof query.page === 'string' ? query.page : '') || 1;

  const count = data?.items.count || 0;
  const items = data?.items.select || [];
  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm variables={variables} />
        <SiteSubtitle>List of Items</SiteSubtitle>
        <ItemsFilters variables={variables} refetch={refetch} />
        {!!items && <ItemsTable items={items} variables={variables} />}
        <Pagination
          path={'/admin/items'}
          page={page}
          total={count}
          take={variables.take || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
