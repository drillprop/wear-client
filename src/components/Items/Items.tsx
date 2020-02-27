import React, { useState, useEffect } from 'react';
import {
  ItemsQueryVariables,
  SortOrder,
  useItemsQuery
} from '../../generated/types';
import { SiteWrapper, SiteSubtitle } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Pagination from '../Pagination/Pagination';
import CreateItemForm from './items/CreateItemForm';
import ItemsTable from './items/ItemsTable';
import ItemsFilters from './items/ItemsFilters';

const Items: React.FC = () => {
  const [variables, setVariables] = useState<ItemsQueryVariables>({
    take: 5,
    skip: 0,
    sortBy: 'Item.createdAt',
    sortOrder: SortOrder.Asc
  });

  const { data } = useItemsQuery({
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    setVariables({ ...variables });
  }, [data]);

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
          total={count}
          state={variables}
          setNewState={setVariables}
        />
      </div>
    </SiteWrapper>
  );
};

export default Items;
