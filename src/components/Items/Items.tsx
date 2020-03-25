import React from 'react';
import { SortOrder, useItemsQuery } from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsFilters from './items/ItemsFilters';
import ItemsTable from './items/ItemsTable';

interface Props {
  query: {
    page: string;
  };
}

const Items: React.FC<Props> = ({ query }) => {
  const { data, refetch, variables } = useItemsQuery({
    variables: {
      take: 5,
      skip: 0,
      sortBy: 'Item.createdAt',
      sortOrder: SortOrder.DESC,
      available: false
    }
  });

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
          page={parseInt(query.page) || 1}
          total={count}
          take={variables.take || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
