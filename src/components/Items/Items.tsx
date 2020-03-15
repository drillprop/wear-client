import React, { useState } from 'react';
import {
  ItemsQueryVariables,
  SortOrder,
  useItemsQuery
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsFilters from './items/ItemsFilters';
import ItemsTable from './items/ItemsTable';

interface Props {
  query: {
    page?: string;
  };
}

const Items: React.FC<Props> = ({ query }) => {
  const [variables, setVariables] = useState<ItemsQueryVariables>({
    take: 5,
    skip: 0,
    sortBy: 'Item.createdAt',
    sortOrder: SortOrder.Desc,
    available: false
  });

  const { data } = useItemsQuery({
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  });

  const count = data?.items.count || 0;
  const items = data?.items.select || [];
  return (
    <SiteWrapper>
      <AdminSideNav />
      <div>
        <CreateItemForm variables={variables} />
        <SiteSubtitle>List of Items</SiteSubtitle>
        <ItemsFilters variables={variables} setVariables={setVariables} />
        <ItemsTable items={items} variables={variables} />
        <Pagination
          page={(query.page && parseInt(query.page)) || 1}
          total={count}
          take={variables.take || 5}
          setNewState={setVariables}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
